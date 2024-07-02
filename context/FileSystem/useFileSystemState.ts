import type * as IBrowserFS from "browserfs";
import type IsoFS from "browserfs/dist/node/backend/IsoFS";
import type MountableFileSystem from "browserfs/dist/node/backend/MountableFileSystem";
import type ZipFS from "browserfs/dist/node/backend/ZipFS";
import type { BFSCallback } from "browserfs/dist/node/core/file_system";
import type { FSModule } from "browserfs/dist/node/core/FS";
import { extname } from "path";
import { useEffect, useState } from "react";

import * as BrowserFS from "@/public/libs/browserfs/browserfs.min.js";

import FileSystemConfig from "./config";
import { handleFileInputEvent } from "./functions";
import type { FileSystemStateType } from "./types";

const { BFSRequire, configure, FileSystem } = BrowserFS as typeof IBrowserFS;

const useFileSystemState = (): FileSystemStateType => {
  const [fs, setFs] = useState<FSModule>();
  const [fileInput, setFileInput] = useState<HTMLInputElement>();
  const rootFs = fs?.getRootFS() as MountableFileSystem;

  const mountFs = (url: string, callback: () => void): void =>
    fs?.readFile(url, (_readErr, fileData = Buffer.from("")) => {
      const isISO = extname(url) === ".iso";
      const createFs: BFSCallback<IsoFS | ZipFS> = (_createErr, newFs) => {
        if (newFs) {
          rootFs?.mount(url, newFs);
          callback();
        }
      };

      if (isISO) {
        FileSystem.IsoFS.Create({ data: fileData }, createFs);
      } else {
        FileSystem.ZipFS.Create({ zipData: fileData }, createFs);
      }
    });

  const unMountFs = (url: string): void => rootFs?.umount(url);
  const addFile = (callback: (name: string, buffer: Buffer) => void): void => {
    if (fileInput) {
      fileInput.addEventListener(
        "change",
        (event) => handleFileInputEvent(event, callback),
        { once: true },
      );
      fileInput.click();
    }
  };

  useEffect(() => {
    if (!fs) {
      configure(FileSystemConfig, () => setFs(BFSRequire("fs")));
    }
  }, [fs]);

  return { fs, mountFs, unMountFs, setFileInput, addFile };
};

export default useFileSystemState;
