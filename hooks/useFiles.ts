import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";

const useFiles = (directory: string) => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);
  const updateFiles = useCallback(
    (appendFiles?: string) =>
      fs?.readdir(directory, (_err, contents = []) =>
        setFiles((currentFiles) =>
          appendFiles && contents.length !== 0
            ? [...currentFiles, appendFiles]
            : contents
        )
      ),
    [fs, directory]
  );

  useEffect(updateFiles, [updateFiles]);

  return { files, updateFiles };
};

export default useFiles;
