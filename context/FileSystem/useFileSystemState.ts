import type IndexedDBFileSystem from "browserfs/dist/node/backend/IndexedDB";
import type IIsoFS from "browserfs/dist/node/backend/IsoFS";
import type OverlayFS from "browserfs/dist/node/backend/OverlayFS";
import type XmlHttpRequest from "browserfs/dist/node/backend/XmlHttpRequest";
import type IZipFS from "browserfs/dist/node/backend/ZipFS";
import type { BFSCallback } from "browserfs/dist/node/core/file_system";
import { dirname, extname, join } from "path";
import { useCallback, useState } from "react";

import { handleFileInputEvent } from "./functions";
import type {
  FilePasteOperations,
  FileSystemStateType,
  UpdateFiles,
} from "./types";
import useAsyncFs from "./useAsyncFs";

const useFileSystemState = (): FileSystemStateType => {
  const { rootFs, IsoFS, ZipFS, ...asyncFs } = useAsyncFs();
  const { exists, mkdir, readFile } = asyncFs;
  const [fileInput, setFileInput] = useState<HTMLInputElement>();
  const [fsWatchers, setFsWatchers] = useState<Record<string, UpdateFiles[]>>(
    {},
  );
  const [pasteList, setPasteList] = useState<FilePasteOperations>({});

  const updatePasteEntries = (
    entries: string[],
    operation: "copy" | "move",
  ): void =>
    setPasteList(
      Object.fromEntries(entries.map((entry) => [entry, operation])),
    );

  const copyEntries = (entries: string[]): void =>
    updatePasteEntries(entries, "copy");

  const moveEntries = (entries: string[]): void =>
    updatePasteEntries(entries, "move");

  const updateFolder = useCallback(
    (folder: string, newFile?: string, oldFile?: string): void => {
      const relevantPaths =
        folder === "/"
          ? [folder]
          : Object.keys(fsWatchers).filter(
              (watchedPath) =>
                watchedPath === folder ||
                (watchedPath !== "/" && watchedPath === dirname(folder)),
            );

      relevantPaths.forEach((watchedFolder) =>
        fsWatchers[watchedFolder]?.forEach((updateFiles) =>
          watchedFolder === folder
            ? updateFiles(newFile, oldFile)
            : updateFiles(),
        ),
      );
    },

    [fsWatchers],
  );
  const addFsWatcher = useCallback(
    (folder: string, updateFiles: UpdateFiles): void =>
      setFsWatchers((currentFsWatcher) => ({
        ...currentFsWatcher,
        [folder]: [...(currentFsWatcher?.[folder] || []), updateFiles],
      })),
    [],
  );
  const removeFsWatcher = useCallback(
    (folder: string, updateFiles: UpdateFiles): void =>
      setFsWatchers((currentFsWatcher) => ({
        ...currentFsWatcher,
        [folder]: currentFsWatcher?.[folder]?.filter(
          (updateFilesInstance) => updateFilesInstance !== updateFiles,
        ),
      })),
    [],
  );

  const mountFs = async (url: string): Promise<void> => {
    const fileData = await readFile(url);

    return new Promise((resolve, reject) => {
      const createFs: BFSCallback<IIsoFS | IZipFS> = (createError, newFs) => {
        if (createError) reject(createError);
        else if (newFs) {
          rootFs?.mount?.(url, newFs);
          resolve();
        }
      };

      if (extname(url) === ".iso") {
        IsoFS?.Create({ data: fileData }, createFs);
      } else {
        ZipFS?.Create({ zipData: fileData }, createFs);
      }
    });
  };

  const unMountFs = (url: string): void => rootFs?.umount?.(url);

  const addFile = (callback: (name: string, buffer?: Buffer) => void): void => {
    fileInput?.addEventListener(
      "change",
      (event) => handleFileInputEvent(event, callback),
      { once: true },
    );
    fileInput?.click();
  };

  const resetFs = (): Promise<void> =>
    new Promise((resolve, reject) => {
      const overlayFs = rootFs?._getFs("/")?.fs as OverlayFS;
      const overlayedFileSystems = overlayFs.getOverlayedFileSystems();
      const readable = overlayedFileSystems.readable as XmlHttpRequest;
      const writable = overlayedFileSystems.writable as IndexedDBFileSystem;

      readable.empty();
      writable.empty((apiError) => (apiError ? reject(apiError) : resolve()));
    });

  const mkdirRecursive = async (path: string): Promise<void> => {
    const pathParts = path.split("/").filter(Boolean);
    const recursePath = async (position = 1): Promise<void> => {
      const makePath = join("/", pathParts.slice(0, position).join("/"));
      const created = (await exists(makePath)) || (await mkdir(makePath));

      if (created && position !== pathParts.length) {
        await recursePath(position + 1);
      }
    };

    await recursePath();
  };

  return {
    addFile,
    addFsWatcher,
    copyEntries,
    mkdirRecursive,
    mountFs,
    moveEntries,
    pasteList,
    resetFs,
    removeFsWatcher,
    setFileInput,
    unMountFs,
    updateFolder,
    ...asyncFs,
  };
};

export default useFileSystemState;
