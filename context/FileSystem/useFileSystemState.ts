import type * as IBrowserFS from "browserfs";
import type IndexedDBFileSystem from "browserfs/dist/node/backend/IndexedDB";
import type IsoFS from "browserfs/dist/node/backend/IsoFS";
import type MountableFileSystem from "browserfs/dist/node/backend/MountableFileSystem";
import type OverlayFS from "browserfs/dist/node/backend/OverlayFS";
import type XmlHttpRequest from "browserfs/dist/node/backend/XmlHttpRequest";
import type ZipFS from "browserfs/dist/node/backend/ZipFS";
import type { BFSCallback } from "browserfs/dist/node/core/file_system";
import type { FSModule } from "browserfs/dist/node/core/FS";
import { extname } from "path";
import { useEffect, useState } from "react";

import { useSession } from "@/context/Session";
import * as BrowserFS from "@/public/libs/browserfs/browserfs.min.js";

import FileSystemConfig from "./config";
import { handleFileInputEvent } from "./functions";
import type { FileSystemStateType } from "./types";

const { BFSRequire, configure, FileSystem } = BrowserFS as typeof IBrowserFS;

const useFileSystemState = (): FileSystemStateType => {
  const [fs, setFs] = useState<FSModule>();
  const [fileInput, setFileInput] = useState<HTMLInputElement>();
  const { updateFolder } = useSession();

  const rootFs = fs?.getRootFS() as MountableFileSystem;

  const mountFs = (url: string): void =>
    fs?.readFile(url, (_readErr, fileData = Buffer.from("")) => {
      const isISO = extname(url) === ".iso";
      const createFs: BFSCallback<IsoFS | ZipFS> = (_createErr, newFs) => {
        if (newFs) {
          rootFs?.mount(url, newFs);
          updateFolder(url);
        }
      };

      if (isISO) {
        FileSystem.IsoFS.Create({ data: fileData }, createFs);
      } else {
        FileSystem.ZipFS.Create({ zipData: fileData }, createFs);
      }
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

  useEffect(() => {
    if (!fs) {
      configure(FileSystemConfig, () => setFs(BFSRequire("fs")));
    }
  }, [fs]);

  return { addFile, fs, mountFs, resetFs, setFileInput, unMountFs };
};

export default useFileSystemState;
