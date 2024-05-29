import { useCallback, useEffect, useRef } from "react";

import type { RenameBoxProps } from "./types";

const RenameBox: React.FC<RenameBoxProps> = ({ name, path, renameFile }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const saveRename = useCallback(() => {
    renameFile(path, inputRef?.current?.value);
  }, [path, renameFile]);

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, []);

  return (
    <input
      ref={inputRef}
      defaultValue={name}
      onBlur={saveRename}
      type="text"
      size={1}
      onKeyDown={({ key }) => key === "Enter" && saveRename()}
      className="border border-rename-box-border text-[11.5px] mb-0.5 py-px px-[5px] relative text-center top-0.5 w-[60px]"
    />
  );
};

export default RenameBox;
