import type * as IBrowserFS from "browserfs";
import type IndexedDBFileSystem from "browserfs/dist/node/backend/IndexedDB";
import type IsoFS from "browserfs/dist/node/backend/IsoFS";
import type MountableFileSystem from "browserfs/dist/node/backend/MountableFileSystem";
import type OverlayFS from "browserfs/dist/node/backend/OverlayFS";
import type XmlHttpRequest from "browserfs/dist/node/backend/XmlHttpRequest";
import type ZipFS from "browserfs/dist/node/backend/ZipFS";
import type { BFSCallback } from "browserfs/dist/node/core/file_system";
import type { FSModule } from "browserfs/dist/node/core/FS";
import { basename, dirname, extname, join } from "path";
import { useCallback, useEffect, useState } from "react";

import * as BrowserFS from "@/public/libs/browserfs/browserfs.min.js";

import FileSystemConfig from "./config";
import { handleFileInputEvent } from "./functions";
import type {
  FilePasteOperations,
  FileSystemStateType,
  UpdateFiles,
} from "./types";

const { BFSRequire, configure, FileSystem } = BrowserFS as typeof IBrowserFS;

const useFileSystemState = (): FileSystemStateType => {
  const [fs, setFs] = useState<FSModule>();
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

  const rootFs = fs?.getRootFS() as MountableFileSystem;

  const updateFolder = useCallback(
    (folder: string, newFile?: string, oldFile?: string): void => {
      const relevantPaths =
        folder === "/"
          ? [folder]
          : Object.keys(fsWatchers).filter(
              (watchedPath) =>
                watchedPath === folder ||
                (watchedPath !== "/" && watchedPath === dirname(folder)) ||
                watchedPath.startsWith(join(folder, "/")),
            );

      relevantPaths.forEach((watchedFolder) =>
        fsWatchers[watchedFolder].forEach((updateFiles) =>
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

  const mountFs = (url: string): Promise<void> =>
    new Promise((resolve) => {
      fs?.readFile(url, (_readErr, fileData = Buffer.from("")) => {
        const isISO = extname(url) === ".iso";
        const createFs: BFSCallback<IsoFS | ZipFS> = (_createErr, newFs) => {
          if (newFs) {
            rootFs?.mount(url, newFs);
            resolve();
          }
        };

        if (isISO) {
          FileSystem.IsoFS.Create({ data: fileData }, createFs);
        } else {
          FileSystem.ZipFS.Create({ zipData: fileData }, createFs);
        }
      });
    });

  const unMountFs = (url: string): void => rootFs?.umount(url);

  const addFile = (callback: (name: string, buffer?: Buffer) => void): void => {
    if (fileInput) {
      fileInput.addEventListener(
        "change",
        (event) => handleFileInputEvent(event, callback),
        { once: true },
      );
      fileInput.click();
    }
  };

  const resetFs = (): Promise<void> =>
    new Promise((resolve, reject) => {
      const overlayFs = rootFs._getFs("/").fs as OverlayFS;
      const overlayedFileSystems = overlayFs.getOverlayedFileSystems();
      const readable = overlayedFileSystems.readable as XmlHttpRequest;
      const writable = overlayedFileSystems.writable as IndexedDBFileSystem;

      readable.empty();
      writable.empty((apiError) => (apiError ? reject(apiError) : resolve()));
    });

  const mkdirRecursive = (path: string, callback: () => void): void => {
    const pathParts = path.split("/").filter(Boolean);
    const recursePath = (position = 1): void => {
      const makePath = join("/", pathParts.slice(0, position).join("/"));
      const nextPart = (): void =>
        position === pathParts.length ? callback() : recursePath(position + 1);

      fs?.exists(makePath, (exists) => {
        if (exists) nextPart();
        else {
          fs.mkdir(makePath, { flag: "w" }, (error) => {
            if (!error) {
              updateFolder(dirname(makePath), basename(makePath));
              nextPart();
            }
          });
        }
      });
    };

    recursePath();
  };

  useEffect(() => {
    if (!fs) {
      configure(FileSystemConfig, () => setFs(BFSRequire("fs")));
    }
  }, [fs]);

  return {
    addFile,
    addFsWatcher,
    copyEntries,
    fs,
    mkdirRecursive,
    mountFs,
    moveEntries,
    pasteList,
    resetFs,
    removeFsWatcher,
    setFileInput,
    unMountFs,
    updateFolder,
  };
};

export default useFileSystemState;
