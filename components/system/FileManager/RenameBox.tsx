import { extname } from "path";
import { useEffect, useRef } from "react";

import type { RenameBoxProps } from "./types";

const RenameBox: React.FC<RenameBoxProps> = ({ name, path, renameFile }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const saveRename = () => {
    renameFile(path, inputRef?.current?.value);
  };

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.setSelectionRange(0, name.length - extname(name).length);
  }, [name]);

  return (
    <input
      ref={inputRef}
      defaultValue={name}
      onBlurCapture={saveRename}
      type="text"
      size={1}
      onKeyDown={({ key }) => key === "Enter" && saveRename()}
      onKeyUp={(event) => event.preventDefault()}
      className="border-rename-box-border border text-[11.5px] mb-0.5 py-px px-[5px] relative text-center top-0.5 w-[60px] rounded-none focus:outline-none"
    />
  );
};

export default RenameBox;
