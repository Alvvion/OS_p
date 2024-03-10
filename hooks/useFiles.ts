import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";

const useFiles = (directory: string) => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);
  const getFiles = useCallback(
    () => fs?.readdir(directory, (_err, contents = []) => setFiles(contents)),
    [fs, directory]
  );

  useEffect(getFiles, [getFiles]);

  return { files, getFiles };
};

export default useFiles;
