import { basename } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { SHORTCUT } from "@/utils/constants";

const useFiles = (directory: string) => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);

  const updateFiles = (appendFiles?: string) =>
    fs?.readdir(directory, (_err, contents = []) =>
      setFiles((currentFiles) =>
        appendFiles && contents.length !== 0
          ? [...currentFiles, basename(appendFiles)]
          : contents
      )
    );

  const deleteFile = (path: string) => {
    fs?.unlink(path, () => {
      setFiles((currentFiles) =>
        currentFiles.filter((file) => file !== basename(path))
      );
    });
  };

  const renameFile = (path: string, name?: string) => {
    if (name) {
      const newPath = `${directory}/${name}${
        path.endsWith(SHORTCUT) ? SHORTCUT : ""
      }`;

      fs?.rename(path, newPath, () => {
        setFiles((currentFiles) =>
          currentFiles.map((file) =>
            file.replace(basename(path), basename(newPath))
          )
        );
      });
    }
  };

  useEffect(updateFiles, [directory, fs]);

  return { files, updateFiles, deleteFile, renameFile };
};

export default useFiles;
