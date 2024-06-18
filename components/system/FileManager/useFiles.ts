import { basename } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { SHORTCUT } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

const useFiles = (directory: string) => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);
  const [downloadLink, setDownloadLink] = useState("");

  const updateFiles = useCallback(
    (appendFiles?: string) =>
      fs?.readdir(directory, (_err, contents = []) =>
        setFiles((currentFiles) =>
          appendFiles && contents.length > 0
            ? [...currentFiles, basename(appendFiles)]
            : contents
        )
      ),
    [directory, fs]
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

  const downloadFile = (path: string) => {
    fs?.readFile(path, (_e, contents = Buffer.from("")) => {
      const link = document.createElement("a");

      link.href = bufferToUrl(contents);
      link.download = basename(path);

      link.click();

      setDownloadLink(link.href);
    });
  };

  useEffect(updateFiles, [updateFiles]);

  useEffect(
    () => () => {
      if (downloadLink) cleanUpBufferUrl(downloadLink);
    },
    [downloadLink]
  );

  return {
    files,
    updateFiles,
    fileActions: {
      deleteFile,
      renameFile,
      downloadFile,
    },
  };
};

export default useFiles;
