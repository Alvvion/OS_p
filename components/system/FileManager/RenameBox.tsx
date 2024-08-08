import { extname } from "path";
import { useCallback, useEffect, useRef } from "react";

import { haltEvent } from "@/context/FileSystem/functions";
import { useTheme } from "@/context/Theme";
import { MAX_FILE_NAME_LENGTH, PREVENT_SCROLL } from "@/utils/constants";

import { getTextWrapData } from "./functions";
import type { RenameBoxProps } from "./types";

const RenameBox: React.FC<RenameBoxProps> = ({ name, path, renameFile }) => {
  const { sizes, formats } = useTheme();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const saveRename = (): void => {
    renameFile(path, inputRef?.current?.value);
  };

  const updateDimensions = useCallback(
    (textArea: EventTarget | HTMLTextAreaElement | null): void => {
      if (textArea instanceof HTMLTextAreaElement) {
        const { width } = getTextWrapData(
          textArea.value,
          sizes.fileEntry.fontSize,
          formats.systemFont,
        );

        /* eslint-disable no-param-reassign */
        textArea.style.height = "1px";
        textArea.style.height = `${textArea.scrollHeight + 2}px`;
        textArea.style.width = `${width + 22}px`;
        /* eslint-enable no-param-reassign */
      }
    },
    [formats.systemFont, sizes.fileEntry.fontSize],
  );

  useEffect(() => {
    updateDimensions(inputRef.current);
    inputRef?.current?.focus(PREVENT_SCROLL);
    inputRef?.current?.setSelectionRange(0, name.length - extname(name).length);
  }, [name, updateDimensions]);

  return (
    <textarea
      ref={inputRef}
      defaultValue={name}
      onBlurCapture={saveRename}
      onClick={haltEvent}
      maxLength={MAX_FILE_NAME_LENGTH}
      onKeyDown={({ key }) => {
        if (key === "Enter") saveRename();
      }}
      onKeyUp={(event) => {
        updateDimensions(event.target);
        haltEvent(event);
      }}
      onDragStart={haltEvent}
      autoComplete="off"
      rows={1}
      spellCheck={false}
      className="border-rename-box-border border text-[11.5px] mb-0.5 relative text-center top-0.5 rounded-none focus:outline-none resize-none overflow-hidden z-10 whitespace-break-spaces max-w-[70px] min-w-[30px]"
      style={{
        padding: `0 ${sizes.fileEntry.renamePadding}px`,
      }}
    />
  );
};

export default RenameBox;
