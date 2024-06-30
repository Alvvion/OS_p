import { useEffect, useRef } from "react";

import { useFileSystem } from ".";

const FileInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setFileInput } = useFileSystem();

  useEffect(() => {
    if (inputRef.current) setFileInput(inputRef.current);
  }, [setFileInput]);

  return <input type="file" ref={inputRef} className="hidden" />;
};

export default FileInput;
