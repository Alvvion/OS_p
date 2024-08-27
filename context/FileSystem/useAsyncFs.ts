import type * as IBrowserFS from "browserfs";
import type MountableFileSystem from "browserfs/dist/node/backend/MountableFileSystem";
import type { FSModule } from "browserfs/dist/node/core/FS";
import type { Stats } from "fs";
import { useEffect, useMemo, useState } from "react";

import * as BrowserFS from "@/public/System/BrowserFS/browserfs.min.js";
import { EMPTY_BUFFER } from "@/utils/constants";

import FileSystemConfig from "./config";
import type { AsyncFS } from "./types";

const {
  BFSRequire,
  configure,
  FileSystem: { IsoFS, ZipFS },
} = BrowserFS as typeof IBrowserFS;

type RootFileSystem = Omit<MountableFileSystem, "mntMap"> & {
  mntMap: Record<string, { data: Buffer }>;
};

type AsyncFSModule = AsyncFS & {
  fs?: FSModule;
  IsoFS?: typeof IsoFS;
  rootFs?: RootFileSystem;
  ZipFS?: typeof ZipFS;
};

const useAsyncFs = (): AsyncFSModule => {
  const [fs, setFs] = useState<FSModule>();
  const [rootFs, setRootFs] = useState<RootFileSystem>();
  const asyncFs: AsyncFS = useMemo(
    () => ({
      exists: (path) =>
        new Promise((resolve) => {
          fs?.exists(path, resolve);
        }),
      mkdir: (path, overwrite = false) =>
        new Promise((resolve, reject) => {
          fs?.mkdir(path, { flag: overwrite ? "w" : "wx" }, (error) =>
            error ? reject(error) : resolve(true),
          );
        }),
      readFile: (path) =>
        new Promise((resolve, reject) => {
          fs?.readFile(path, (error, data = EMPTY_BUFFER) => {
            if (!error) return resolve(data);
            if (error.code === "EISDIR" && rootFs?.mntMap[path]?.data) {
              return resolve(rootFs.mntMap[path].data);
            }
            return reject(error);
          });
        }),
      readdir: (path) =>
        new Promise((resolve, reject) => {
          fs?.readdir(path, (error, data = []) =>
            error ? reject(error) : resolve(data),
          );
        }),
      rename: (oldPath, newPath) =>
        new Promise((resolve, reject) => {
          fs?.rename(oldPath, newPath, (renameError) => {
            if (!renameError) {
              resolve(true);
            } else if (renameError.code === "ENOTSUP") {
              fs.readFile(oldPath, (readError, data) =>
                fs.writeFile(newPath, data, (writeError) =>
                  readError || writeError
                    ? reject(readError || writeError)
                    : resolve(false),
                ),
              );
            } else if (renameError.code === "EISDIR") {
              rootFs?.umount(oldPath);
              asyncFs.rename(oldPath, newPath).then(resolve, reject);
            } else {
              reject(renameError);
            }
          });
        }),
      rmdir: (path) =>
        new Promise((resolve, reject) => {
          fs?.rmdir(path, (error) => (error ? reject(error) : resolve(true)));
        }),
      stat: (path) =>
        new Promise((resolve, reject) => {
          fs?.stat(path, (error, stats = {} as unknown) =>
            error ? reject(error) : resolve(stats as Stats),
          );
        }),
      unlink: (path) =>
        new Promise((resolve, reject) => {
          fs?.unlink(path, (error) => (error ? reject(error) : resolve(true)));
        }),
      writeFile: (path, data, overwrite = false) =>
        new Promise((resolve, reject) => {
          fs?.writeFile(
            path,
            data,
            { flag: overwrite ? "w" : "wx" },
            (error) => (error ? reject(error) : resolve(true)),
          );
        }),
    }),
    [fs, rootFs],
  );

  useEffect(() => {
    if (!fs)
      configure(FileSystemConfig, () => {
        const loadedFs = BFSRequire("fs");

        setFs(loadedFs);
        setRootFs(loadedFs.getRootFS() as RootFileSystem);
      });
  }, [fs]);

  return {
    ...asyncFs,
    IsoFS,
    ZipFS,
    fs,
    rootFs,
  };
};

export default useAsyncFs;
