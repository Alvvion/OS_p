import type { FSModule } from "browserfs/dist/node/core/FS";
import type { Stats } from "fs";
import { useMemo } from "react";

import { EMPTY_BUFFER } from "@/utils/constants";

import type { AsyncFSModule } from "./types";

const useAsyncFs = (fs?: FSModule): AsyncFSModule =>
  useMemo(
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
          fs?.readFile(path, (error, data = EMPTY_BUFFER) =>
            error ? reject(error) : resolve(data),
          );
        }),
      readdir: (path) =>
        new Promise((resolve, reject) => {
          fs?.readdir(path, (error, data = []) =>
            error ? reject(error) : resolve(data),
          );
        }),
      rename: (oldPath, newPath) =>
        new Promise((resolve, reject) => {
          fs?.rename(oldPath, newPath, (error) =>
            error ? reject(error) : resolve(true),
          );
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
    [fs],
  );

export default useAsyncFs;
