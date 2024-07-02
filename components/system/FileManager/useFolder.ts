import type { BFSOneArgCallback } from "browserfs/dist/node/core/file_system";
import { basename, dirname, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { SHORTCUT } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { filterSystemFiles, iterateFileNames, sortContents } from "./functions";
import type { Folder } from "./types";

const useFolder: (directory: string) => Folder = (directory) => {
  const { addFile, fs } = useFileSystem();
  const { focusEntry } = useSession();
  const [files, setFiles] = useState<string[]>([]);
  const [downloadLink, setDownloadLink] = useState("");

  const updateFiles = useCallback(
    (appendFile = "") => {
      if (appendFile) {
        setFiles((currentFiles) => [...currentFiles, basename(appendFile)]);
      } else {
        fs?.readdir(directory, (_error, contents = []) =>
          setFiles(sortContents(contents).filter(filterSystemFiles(directory))),
        );
      }
    },
    [directory, fs],
  );

  const deleteFile = (path: string) => {
    const removeFile = () =>
      setFiles((currentFiles) =>
        currentFiles.filter((file) => file !== basename(path)),
      );

    fs?.stat(path, (_e, stats) => {
      if (stats?.isDirectory()) fs?.rmdir(path, removeFile);
      else fs?.unlink(path, removeFile);
    });
  };

  const renameFile = (path: string, name?: string) => {
    if (name) {
      const newPath = join(
        directory,
        `${name}${path.endsWith(SHORTCUT) ? SHORTCUT : ""}`,
      );

      fs?.rename(path, newPath, () => {
        setFiles((currentFiles) =>
          currentFiles.map((file) =>
            file === basename(path) ? basename(newPath) : file,
          ),
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

  const newPath = (name: string, buffer?: Buffer, iteration = 0): void => {
    if (!buffer && ![".", directory].includes(dirname(name))) {
      fs?.rename(name, join(directory, basename(name)), () => updateFiles());
    } else {
      const uniqueName = iteration ? iterateFileNames(name, iteration) : name;
      const resolvedPath = join(directory, uniqueName);
      const checkWrite: BFSOneArgCallback = (error) => {
        if (!error) {
          updateFiles(uniqueName);
          focusEntry(uniqueName);
        } else if (error.code === "EEXIST") {
          newPath(name, buffer, iteration + 1);
        }
      };

      if (buffer) {
        fs?.writeFile(resolvedPath, buffer, { flag: "wx" }, checkWrite);
      } else {
        fs?.mkdir(resolvedPath, { flag: "wx" }, checkWrite);
      }
    }
  };

  useEffect(updateFiles, [updateFiles]);

  useEffect(
    () => () => {
      if (downloadLink) cleanUpBufferUrl(downloadLink);
    },
    [downloadLink],
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
      newPath,
      addToFolder: () => addFile(newPath),
    },
  };
};

export default useFolder;
