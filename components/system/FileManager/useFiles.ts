import { basename, extname } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";

const useFiles = (directory: string) => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);

  const updateFiles = useCallback(
    (appendFiles?: string) =>
      fs?.readdir(directory, (_err, contents = []) =>
        setFiles((currentFiles) =>
          appendFiles && contents.length !== 0
            ? [...currentFiles, basename(appendFiles)]
            : contents
        )
      ),
    [fs, directory]
  );

  const deleteFile = useCallback(
    (path: string) => {
      fs?.unlink(path, () => {
        setFiles((currentFiles) =>
          currentFiles.filter((file) => file !== basename(path))
        );
      });
    },
    [fs]
  );

  const renameFile = useCallback(
    (path: string, name?: string) => {
      if (name) {
        const newPath = `${directory}/${name}${extname(path)}`;

        fs?.rename(path, newPath, () => {
          setFiles((currentFiles) =>
            currentFiles.map((file) =>
              file.replace(basename(path), basename(newPath))
            )
          );
        });
      }
    },
    [directory, fs]
  );

  useEffect(updateFiles, [updateFiles]);

  return { files, updateFiles, deleteFile, renameFile };
};

export default useFiles;
