import { extname } from "path";
import { useEffect, useRef } from "react";

import { haltEvent } from "@/context/FileSystem/functions";
import { PREVENT_SCROLL } from "@/utils/constants";

import type { RenameBoxProps } from "./types";

const RenameBox: React.FC<RenameBoxProps> = ({ name, path, renameFile }) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const saveRename = (): void => {
    renameFile(path, inputRef?.current?.value);
  };

  useEffect(() => {
    inputRef?.current?.focus(PREVENT_SCROLL);
    inputRef?.current?.setSelectionRange(0, name.length - extname(name).length);
  }, [name]);

  return (
    <textarea
      ref={inputRef}
      defaultValue={name}
      onBlurCapture={saveRename}
      onClick={haltEvent}
      onKeyDown={({ key }) => key === "Enter" && saveRename()}
      onKeyUp={haltEvent}
      autoComplete="off"
      rows={1}
      spellCheck={false}
      className="border-rename-box-border border text-[11.5px] mb-0.5 py-px px-[5px] relative text-center top-0.5 w-[70px] rounded-none focus:outline-none resize-none"
    />
  );
};

export default RenameBox;
