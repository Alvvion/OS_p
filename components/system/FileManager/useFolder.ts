import type { ApiError } from "browserfs/dist/node/core/api_error";
import type { BFSCallback } from "browserfs/dist/node/core/file_system";
import type { AsyncZippable } from "fflate";
import { zip } from "fflate";
import type { Stats } from "fs";
import ini from "ini";
import { basename, dirname, extname, join, relative } from "path";
import { useCallback, useEffect, useState } from "react";

import { unzipAsync } from "@/components/apps/JSDOS/functions";
import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import { useFileSystem } from "@/context/FileSystem";
import {
  getIconByFileExtension,
  getShortcutInfo,
} from "@/context/FileSystem/functions";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import {
  EMPTY_BUFFER,
  ICON_PATH,
  INVALID_FILE_CHARACTERS,
  PROCESS_DELIMITER,
  SHORTCUT,
  SHORTCUT_APPEND,
} from "@/utils/constants";
import { cleanUpBufferUrl } from "@/utils/functions";

import {
  createLink,
  filterSystemFiles,
  findPathsRecursive,
  sortContents,
} from "./functions";
import type { Files, FileStat, Folder, ZipFile } from "./types";
import useSortBy from "./useSortBy";

const useFolder = (
  directory: string,
  setRenaming: React.Dispatch<React.SetStateAction<string>>,
): Folder => {
  const [files, setFiles] = useState<Files>();
  const [downloadLink, setDownloadLink] = useState("");
  const [isLoading, setLoading] = useState(true);
  const {
    addFile,
    addFsWatcher,
    copyEntries,
    createPath,
    exists,
    fs,
    mkdir,
    mkdirRecursive,
    pasteList,
    readdir,
    readFile,
    removeFsWatcher,
    rename,
    rmdir,
    stat,
    unlink,
    updateFolder,
    writeFile,
  } = useFileSystem();
  const {
    blurEntry,
    focusEntry,
    sessionLoaded,
    setSortOrders,
    sortOrders: { [directory]: sortOrder } = {},
  } = useSession();
  const { closeProcess } = useProcesses();
  const statsWithShortcutInfo = useCallback(
    (fileName: string, stats: Stats): Promise<FileStat> =>
      new Promise((resolve) => {
        if (extname(fileName) === SHORTCUT) {
          fs?.readFile(
            join(directory, fileName),
            (_readError, contents = EMPTY_BUFFER) =>
              resolve(
                Object.assign(stats, {
                  systemShortcut: getShortcutInfo(contents).type === "System",
                }),
              ),
          );
        } else {
          resolve(stats);
        }
      }),
    [directory, fs],
  );

  const updateFiles = useCallback(
    async (newFile?: string, oldFile?: string, customSortOrder?: string[]) => {
      if (oldFile) {
        if (!(await exists(join(directory, oldFile)))) {
          const oldName = basename(oldFile);
          if (newFile) {
            setFiles(({ [oldName]: fileStats, ...currentFiles } = {}) => ({
              ...currentFiles,
              [basename(newFile)]: fileStats,
            }));
          } else {
            blurEntry(oldName);
            setFiles(
              ({ [oldName]: _fileStats, ...currentFiles } = {}) => currentFiles,
            );
          }
        }
      } else if (newFile) {
        const baseName = basename(newFile);
        const allStats = await statsWithShortcutInfo(
          baseName,
          await stat(join(directory, newFile)),
        );

        setFiles((currentFiles = {}) => ({
          ...currentFiles,
          [baseName]: allStats,
        }));
      } else {
        setLoading(true);

        try {
          const dirContents = (await readdir(directory)).filter(
            filterSystemFiles(directory),
          );
          const sortedFiles = await dirContents.reduce(
            async (processedFiles, file) => {
              const newFiles = sortContents(
                {
                  ...(await processedFiles),
                  [file]: await statsWithShortcutInfo(
                    file,
                    await stat(join(directory, file)),
                  ),
                },
                customSortOrder || Object.keys(files || {}),
              );

              setFiles(newFiles);

              return newFiles;
            },
            {},
          );

          if (dirContents.length > 0) {
            setSortOrders((currentSortOrder) => ({
              ...currentSortOrder,
              [directory]: Object.keys(sortedFiles),
            }));
          } else {
            setFiles({});
          }
        } catch (error) {
          if ((error as ApiError).code === "ENOENT") {
            closeWithTransition(
              closeProcess,
              `FileExplorer${PROCESS_DELIMITER}${directory}`,
            );
          }
        }

        setLoading(false);
      }
    },
    [
      blurEntry,
      closeProcess,
      directory,
      exists,
      files,
      readdir,
      setSortOrders,
      stat,
      statsWithShortcutInfo,
    ],
  );
  const deletePath = async (path: string, updatePath = true): Promise<void> => {
    try {
      await unlink(path);
    } catch (error) {
      if ((error as ApiError).code === "EISDIR") {
        const dirContents = await readdir(path);

        await Promise.all(
          dirContents.map((entry) => deletePath(join(path, entry), false)),
        );
        await rmdir(path);
      }
    }

    if (updatePath) updateFolder(directory, undefined, basename(path));
  };
  const getFile = (path: string): Promise<ZipFile> =>
    new Promise((resolve) => {
      fs?.readFile(path, (_readError, contents = EMPTY_BUFFER) =>
        resolve([relative(directory, path), contents]),
      );
    });
  const downloadFiles = (paths: string[]): Promise<void> =>
    findPathsRecursive(paths, readdir, stat).then((allPaths) =>
      Promise.all(allPaths.map((path) => getFile(path))).then((filePaths) => {
        const zipFiles = filePaths.filter(Boolean);

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
      }),
    );

  const renameFile = async (path: string, name?: string): Promise<void> => {
    const newName = name?.replace(INVALID_FILE_CHARACTERS, "").trim();

    if (newName) {
      const renamedPath = join(
        directory,
        `${newName}${path.endsWith(SHORTCUT) ? SHORTCUT : ""}`,
      );

      if (!(await exists(renamedPath))) {
        await rename(path, renamedPath);
        updateFolder(directory, renamedPath, path);
      }
    }
  };
  const newPath = async (
    name: string,
    buffer?: Buffer,
    thenRename = false,
  ): Promise<void> => {
    const uniqueName = await createPath(name, directory, buffer);

    if (uniqueName && !uniqueName.includes("/")) {
      updateFolder(directory, uniqueName);

      if (thenRename) setRenaming(uniqueName);
      else {
        blurEntry();
        focusEntry(uniqueName);
      }
    }
  };

  const newShortcut = (path: string, process: string): void => {
    const pathExtension = extname(path);

    if (pathExtension === SHORTCUT) {
      fs?.readFile(path, (_readError, contents = EMPTY_BUFFER) =>
        newPath(basename(path), contents),
      );
    } else {
      const baseName = basename(path);
      const shortcutPath = `${baseName}${SHORTCUT_APPEND}${SHORTCUT}`;
      const shortcutData = ini.encode(
        {
          BaseURL: process,
          IconFile:
            process !== "FileExplorer" && pathExtension
              ? getIconByFileExtension(pathExtension)
              : `${ICON_PATH}folder.ico`,
          URL: path,
        },
        {
          section: "InternetShortcut",
          whitespace: false,
        },
      );

      newPath(shortcutPath, Buffer.from(shortcutData));
    }
  };
  const archiveFiles = (paths: string[]): Promise<void> =>
    findPathsRecursive(paths, readdir, stat).then((allPaths) =>
      Promise.all(allPaths.map((path) => getFile(path))).then((filePaths) => {
        const zipFiles = filePaths.filter(Boolean);

        zip(
          Object.fromEntries(zipFiles) as AsyncZippable,
          (_zipError, newZipFile) => {
            newPath(
              `${basename(directory) || "archive"}.zip`,
              Buffer.from(newZipFile),
            );
          },
        );
      }),
    );
  const extractFiles = async (path: string): Promise<void> => {
    const unzippedFiles = await unzipAsync(await readFile(path));
    const zipFolderName = basename(path, extname(path));

    if (await mkdir(join(directory, zipFolderName))) {
      for (const [extractPath, fileContents] of Object.entries(unzippedFiles)) {
        const localPath = join(directory, zipFolderName, extractPath);

        /* eslint-disable no-await-in-loop */
        if (fileContents.length === 0 && extractPath.endsWith("/")) {
          await mkdir(localPath);
        } else {
          if (!(await exists(dirname(localPath)))) {
            await mkdirRecursive(dirname(localPath));
          }

          await writeFile(localPath, Buffer.from(fileContents));
        }
        /* eslint-enable no-await-in-loop */
      }

      updateFolder(directory, zipFolderName);
    }
  };
  const pasteToFolder = (): void => {
    const pasteEntries = Object.entries(pasteList);
    const moving = pasteEntries.some(([, operation]) => operation === "move");
    const copyFiles =
      (entry: string, basePath = ""): BFSCallback<Buffer> =>
      (readError, fileContents) =>
        newPath(join(basePath, basename(entry)), fileContents).then(() => {
          if (readError?.code === "EISDIR") {
            fs?.readdir(entry, (_dirError, dirContents) =>
              dirContents?.forEach((dirEntry) => {
                const dirPath = join(entry, dirEntry);

                fs.readFile(dirPath, copyFiles(dirPath));
              }),
            );
          }
        });

    pasteEntries.forEach(([pasteEntry]) =>
      moving
        ? newPath(pasteEntry)
        : fs?.readFile(pasteEntry, copyFiles(pasteEntry)),
    );

    if (moving) copyEntries([]);
  };

  useEffect(() => {
    if (sessionLoaded) {
      if (files) {
        const fileNames = Object.keys(files);

        if (sortOrder && fileNames.length === sortOrder.length) {
          if (fileNames.some((file) => !sortOrder.includes(file))) {
            const oldName = sortOrder.find(
              (entry) => !fileNames.includes(entry),
            );
            const newName = fileNames.find(
              (entry) => !sortOrder.includes(entry),
            );

            if (oldName && newName) {
              setSortOrders((currentSortOrder) => ({
                ...currentSortOrder,
                [directory]: sortOrder.map((entry) =>
                  entry === oldName ? newName : entry,
                ),
              }));
            }
          } else if (
            fileNames.some((file, index) => file !== sortOrder[index])
          ) {
            setFiles((currentFiles) =>
              sortContents(currentFiles || files, sortOrder),
            );
          }
        }
      } else {
        updateFiles(undefined, undefined, sortOrder);
      }
    }
  }, [directory, files, sessionLoaded, setSortOrders, sortOrder, updateFiles]);

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
    fileActions: {
      archiveFiles,
      deletePath,
      downloadFiles,
      extractFiles,
      newShortcut,
      renameFile,
    },
    files: files || {},
    folderActions: {
      addToFolder: () => addFile(newPath),
      newPath,
      pasteToFolder,
      resetFiles: () => setFiles(undefined),
      setSortBy: useSortBy(directory, files),
    },
    isLoading,
    updateFiles,
  };
};

export default useFolder;
