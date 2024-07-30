import { extname } from "path";
import { useCallback, useEffect, useRef } from "react";

import { haltEvent } from "@/context/FileSystem/functions";
import { useTheme } from "@/context/Theme";
import { PREVENT_SCROLL } from "@/utils/constants";

import { getLineCount } from "./functions";
import type { RenameBoxProps } from "./types";

const RenameBox: React.FC<RenameBoxProps> = ({ name, path, renameFile }) => {
  const { sizes, formats } = useTheme();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const saveRename = (): void => {
    renameFile(path, inputRef?.current?.value);
  };

  const updateRows = useCallback(
    (text: string): void => {
      const lines = getLineCount(
        text,
        sizes.fileEntry.fontSize,
        formats.systemFont,
        sizes.fileEntry.renameWidth - sizes.fileEntry.renamePadding * 2,
      );

      inputRef.current?.setAttribute("rows", lines.toString());
    },
    [
      formats.systemFont,
      sizes.fileEntry.fontSize,
      sizes.fileEntry.renamePadding,
      sizes.fileEntry.renameWidth,
    ],
  );

  useEffect(() => {
    inputRef?.current?.focus(PREVENT_SCROLL);
    inputRef?.current?.setSelectionRange(0, name.length - extname(name).length);
    updateRows(name);
  }, [name, updateRows]);

  return (
    <textarea
      ref={inputRef}
      defaultValue={name}
      onBlurCapture={saveRename}
      onClick={haltEvent}
      onKeyDown={({ key }) => key === "Enter" && saveRename()}
      onKeyUp={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          updateRows(event.target.value);
        }

        haltEvent(event);
      }}
      autoComplete="off"
      rows={1}
      spellCheck={false}
      className="border-rename-box-border border text-[11.5px] mb-0.5 py-px px-[5px] relative text-center top-0.5 rounded-none focus:outline-none resize-none overflow-hidden"
      style={{
        width: `${sizes.fileEntry.renameWidth}px`,
        padding: `${sizes.fileEntry.renamePadding}px`,
      }}
    />
  );
};

export default RenameBox;
