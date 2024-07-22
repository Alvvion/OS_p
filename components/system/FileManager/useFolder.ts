import type { BFSOneArgCallback } from "browserfs/dist/node/core/file_system";
import type { AsyncZippable } from "fflate";
import { unzip, zip } from "fflate";
import ini from "ini";
import { basename, dirname, extname, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { getIconByFileExtension } from "@/context/FileSystem/functions";
import { useSession } from "@/context/Session";
import { SHORTCUT, SHORTCUT_APPEND } from "@/utils/constants";
import { cleanUpBufferUrl } from "@/utils/functions";

import {
  createLink,
  filterSystemFiles,
  getFile,
  iterateFileNames,
  sortContents,
} from "./functions";
import type { FileType, Folder } from "./types";

const useFolder = (
  directory: string,
  setRenaming: React.Dispatch<React.SetStateAction<string>>,
): Folder => {
  const {
    addFile,
    addFsWatcher,
    copyEntries,
    fs,
    pasteList,
    removeFsWatcher,
    updateFolder,
  } = useFileSystem();
  const { focusEntry, blurEntry } = useSession();
  const [files, setFiles] = useState<string[]>([]);
  const [downloadLink, setDownloadLink] = useState("");
  const [isLoading, setLoading] = useState(true);

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
        setFiles((currentFiles) => {
          const newName = basename(newFile);

          return currentFiles.includes(newName)
            ? currentFiles
            : [...currentFiles, newName];
        });
      } else if (fs) {
        setLoading(true);
        fs.readdir(directory, (_error, contents = []) => {
          setLoading(false);
          setFiles(sortContents(contents).filter(filterSystemFiles(directory)));
        });
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
          fs.rename(path, newPath, () =>
            updateFolder(directory, newPath, path),
          );
        }
      });
    }
  };

  const downloadFiles = (paths: string[]): Promise<void> =>
    Promise.all(paths.map((path) => getFile(path, fs))).then((filePaths) => {
      const zipFiles = filePaths.filter(Boolean) as FileType[];

      if (zipFiles.length === 1) {
        const [[path, contents]] = zipFiles;

        createLink(contents, setDownloadLink, basename(path));
      } else {
        zip(
          Object.fromEntries(zipFiles) as AsyncZippable,
          (_zipError, newZipFile) =>
            createLink(Buffer.from(newZipFile), setDownloadLink),
        );
      }
    });

  const newPath = (
    name: string,
    buffer?: Buffer,
    rename = false,
    iteration = 0,
  ): void => {
    const isInternal = !buffer && dirname(name) !== ".";
    const baseName = isInternal ? basename(name) : name;
    const uniqueName = iteration
      ? iterateFileNames(baseName, iteration)
      : baseName;
    const fullNewPath = join(directory, uniqueName);
    if (isInternal) {
      if (name !== fullNewPath) {
        fs?.exists(fullNewPath, (exists) => {
          if (exists) {
            newPath(name, buffer, rename, iteration + 1);
          } else {
            fs.rename(name, fullNewPath, () => {
              updateFolder(directory, uniqueName);
              updateFolder(dirname(name), "", name);
              blurEntry();
              focusEntry(uniqueName);
            });
          }
        });
      }
    } else {
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
        fs?.writeFile(fullNewPath, buffer, { flag: "wx" }, checkWrite);
      } else {
        fs?.mkdir(fullNewPath, { flag: "wx" }, checkWrite);
      }
    }
  };

  const archiveFiles = (paths: string[]): Promise<void> =>
    Promise.all(paths.map((path) => getFile(path, fs))).then((filePaths) => {
      const zipFiles = filePaths.filter(Boolean) as FileType[];

      zip(
        Object.fromEntries(zipFiles) as AsyncZippable,
        (_zipError, newZipFile) => {
          newPath(`${basename(directory)}.zip`, Buffer.from(newZipFile));
        },
      );
    });

  const extractFiles = (path: string): void => {
    fs?.readFile(path, (readError, zipContents = Buffer.from("")) => {
      if (!readError) {
        unzip(zipContents, (_unzipError, unzippedFiles) => {
          const zipFolderName = basename(path, extname(path));

          fs.mkdir(join(directory, zipFolderName), { flag: "w" }, () => {
            Object.entries(unzippedFiles).forEach(
              ([extactedPath, fileContents]) => {
                if (extactedPath.endsWith("/")) {
                  fs.mkdir(join(directory, zipFolderName, extactedPath));
                } else {
                  fs.writeFile(
                    join(directory, zipFolderName, extactedPath),
                    Buffer.from(fileContents),
                  );
                }
              },
            );
            updateFolder(directory, zipFolderName);
          });
        });
      }
    });
  };

  const pasteToFolder = (): void =>
    Object.entries(pasteList).forEach(([fileEntry, operation]) => {
      if (operation === "move") {
        newPath(fileEntry);
        copyEntries([]);
      } else {
        fs?.readFile(fileEntry, (_readError, contents) =>
          newPath(basename(fileEntry), contents),
        );
      }
    });

  const newShortcut = (path: string, process: string): void => {
    const baseName = basename(path);
    const shortcutPath = `${baseName}${SHORTCUT_APPEND}${SHORTCUT}`;
    const pathExtension = extname(path);
    const shortcutData = ini.encode(
      {
        BaseURL: process,
        IconFile: pathExtension
          ? getIconByFileExtension(pathExtension)
          : "/assets/ICON16772_1.ico",
        URL: path,
      },
      {
        section: "InternetShortcut",
        whitespace: false,
      },
    );

    newPath(shortcutPath, Buffer.from(shortcutData));
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
    isLoading,
    updateFiles,
    fileActions: {
      archiveFiles,
      deleteFile,
      downloadFiles,
      extractFiles,
      newShortcut,
      renameFile,
    },
    folderActions: {
      addToFolder: () => addFile(newPath),
      newPath,
      pasteToFolder,
    },
  };
};

export default useFolder;
