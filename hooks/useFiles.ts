import type React from "react";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";

const useFiles = (
  directory: string,
  callback: (file: string) => React.JSX.Element
): React.JSX.Element[] => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    if (fs) {
      fs.readdir(directory, (_err, contents = []) => setFiles(contents));
    }
  }, [fs, directory]);

  return files.map(callback);
};

export default useFiles;
