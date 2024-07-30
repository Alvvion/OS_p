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

  const updateDimensions = useCallback(
    (text: string): void => {
      const textPadding = sizes.fileEntry.renamePadding * 2 + 2;
      const { lines, width } = getLineCount(
        text,
        sizes.fileEntry.fontSize,
        formats.systemFont,
        sizes.fileEntry.renameWidth - textPadding,
      );

      inputRef.current?.setAttribute("rows", lines.length.toString());
      inputRef.current?.setAttribute(
        "style",
        `width: ${Math.ceil(width + textPadding)}px`,
      );
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
    updateDimensions(name);
  }, [name, updateDimensions]);

  return (
    <textarea
      ref={inputRef}
      defaultValue={name}
      onBlurCapture={saveRename}
      onClick={haltEvent}
      onKeyDown={({ key, target }) => {
        if (key === "Enter") {
          saveRename();
        } else if (key.length === 1 && target instanceof HTMLTextAreaElement) {
          updateDimensions(`${target.value}${key}`);
        }
      }}
      onKeyUp={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          updateDimensions(event.target.value);
        }

        haltEvent(event);
      }}
      autoComplete="off"
      rows={1}
      spellCheck={false}
      className="border-rename-box-border border text-[11.5px] mb-0.5 relative text-center top-0.5 rounded-none focus:outline-none resize-none overflow-hidden"
      style={{
        width: `${sizes.fileEntry.renameWidth}px`,
        padding: `0 ${sizes.fileEntry.renamePadding}px`,
      }}
    />
  );
};

export default RenameBox;
