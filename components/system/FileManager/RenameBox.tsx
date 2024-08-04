import { extname } from "path";
import { useEffect, useRef } from "react";

import { haltEvent } from "@/context/FileSystem/functions";
import { useTheme } from "@/context/Theme";
import { PREVENT_SCROLL } from "@/utils/constants";

import type { RenameBoxProps } from "./types";

const RenameBox: React.FC<RenameBoxProps> = ({ name, path, renameFile }) => {
  const { sizes } = useTheme();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const saveRename = (): void => {
    renameFile(path, inputRef?.current?.value);
  };

  const updateDimensions = (
    textArea: EventTarget | HTMLTextAreaElement | null,
  ): void => {
    if (textArea instanceof HTMLTextAreaElement) {
      textArea.setAttribute("style", "height: 1px;");
      textArea.setAttribute("style", `height: ${textArea.scrollHeight + 2}px;`);
    }
  };

  useEffect(() => {
    updateDimensions(inputRef.current);
    inputRef?.current?.focus(PREVENT_SCROLL);
    inputRef?.current?.setSelectionRange(0, name.length - extname(name).length);
  }, [name]);

  return (
    <textarea
      ref={inputRef}
      defaultValue={name}
      onBlurCapture={saveRename}
      onClick={haltEvent}
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
      className="border-rename-box-border border text-[11.5px] mb-0.5 relative text-center top-0.5 rounded-none focus:outline-none resize-none overflow-hidden z-10 w-[70px]"
      style={{
        // width: `${sizes.fileEntry.renameWidth}px`,
        padding: `0 ${sizes.fileEntry.renamePadding}px`,
      }}
    />
  );
};

export default RenameBox;
