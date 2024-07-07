import type { BFSOneArgCallback } from "browserfs/dist/node/core/file_system";
import { basename, dirname, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { SHORTCUT } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { filterSystemFiles, iterateFileNames, sortContents } from "./functions";
import type { Folder } from "./types";

const useFolder = (
  directory: string,
  setRenaming: React.Dispatch<React.SetStateAction<string>>,
): Folder => {
  const { addFile, addFsWatcher, fs, removeFsWatcher, updateFolder } =
    useFileSystem();
  const { focusEntry } = useSession();
  const [files, setFiles] = useState<string[]>([]);
  const [downloadLink, setDownloadLink] = useState("");

  const updateFiles = useCallback(
    (newFile = "", oldFile = "") => {
      if (oldFile && newFile) {
        setFiles((currentFiles) =>
          currentFiles.map((file) =>
            file === basename(oldFile) ? basename(newFile) : file,
          ),
        );
      } else if (oldFile) {
        setFiles((currentFiles) =>
          currentFiles.filter((file) => file !== basename(oldFile)),
        );
      } else if (newFile) {
        setFiles((currentFiles) => [...currentFiles, basename(newFile)]);
      } else {
        fs?.readdir(directory, (_error, contents = []) =>
          setFiles(sortContents(contents).filter(filterSystemFiles(directory))),
        );
      }
    },
    [directory, fs],
  );

  const deleteFile = (path: string): void =>
    fs?.stat(path, (_error, stats) => {
      const fsDelete = stats?.isDirectory() ? fs.rmdir : fs.unlink;

      fsDelete(path, () => updateFolder(directory, "", path));
    });

  const renameFile = (path: string, name?: string): void => {
    const newName = name?.trim();

    if (newName) {
      const newPath = join(
        directory,
        `${newName}${path.endsWith(SHORTCUT) ? SHORTCUT : ""}`,
      );

      fs?.exists(newPath, (exists) => {
        if (!exists) {
          fs?.rename(path, newPath, () =>
            updateFolder(directory, newPath, path),
          );
        }
      });
    }
  };

  const downloadFile = (path: string): void => {
    fs?.readFile(path, (_e, contents = Buffer.from("")) => {
      const link = document.createElement("a");

      link.href = bufferToUrl(contents);
      link.download = basename(path);

      link.click();

      setDownloadLink(link.href);
    });
  };

  const newPath = (
    name: string,
    buffer?: Buffer,
    rename = false,
    iteration = 0,
  ): void => {
    if (!buffer && dirname(name) !== ".") {
      const renamedPath = join(directory, basename(name));

      if (name !== renamedPath) {
        fs?.rename(name, renamedPath, () => {
          updateFolder(directory, name);
          updateFolder(dirname(name), "", name);
        });
      }
    } else {
      const uniqueName = iteration ? iterateFileNames(name, iteration) : name;
      const resolvedPath = join(directory, uniqueName);
      const checkWrite: BFSOneArgCallback = (error) => {
        if (!error) {
          updateFolder(directory, uniqueName);
          if (rename) {
            setRenaming(uniqueName);
          } else {
            focusEntry(uniqueName);
          }
        } else if (error.code === "EEXIST") {
          newPath(name, buffer, rename, iteration + 1);
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

  useEffect(() => {
    addFsWatcher?.(directory, updateFiles);

    return () => removeFsWatcher?.(directory, updateFiles);
  }, [addFsWatcher, directory, removeFsWatcher, updateFiles]);

  return {
    files,
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
