import { basename, resolve } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { SHORTCUT } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { filterSystemFiles } from "./functions";
import type { Folder } from "./types";

const useFolder = (directory: string): Folder => {
  const { fs } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);
  const [downloadLink, setDownloadLink] = useState("");

  const updateFiles = useCallback(
    (appendFile = "") => {
      if (appendFile) {
        setFiles((currentFiles) => [...currentFiles, basename(appendFile)]);
      } else {
        fs?.readdir(directory, (_error, contents = []) =>
          setFiles(contents.filter(filterSystemFiles(directory)))
        );
      }
    },
    [directory, fs]
  );

  const deleteFile = (path: string) => {
    const removeFile = () =>
      setFiles((currentFiles) =>
        currentFiles.filter((file) => file !== basename(path))
      );

    fs?.stat(path, (_e, stats) => {
      if (stats?.isDirectory()) fs?.rmdir(path, removeFile);
      else fs?.unlink(path, removeFile);
    });
  };

  const renameFile = (path: string, name?: string) => {
    if (name) {
      const newPath = `${directory}${directory === "/" ? "" : "/"}${name}${
        path.endsWith(SHORTCUT) ? SHORTCUT : ""
      }`;

      fs?.rename(path, newPath, () => {
        setFiles((currentFiles) =>
          currentFiles.map((file) =>
            file === basename(path) ? basename(newPath) : file
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

  const newFile = (path: string) =>
    fs?.writeFile(resolve(directory, path), Buffer.from(""), () =>
      updateFiles(path)
    );

  const newFolder = (path: string) =>
    fs?.mkdir(resolve(directory, path), () => updateFiles(path));

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
    folderActions: {
      newFile,
      newFolder,
    },
  };
};

export default useFolder;
