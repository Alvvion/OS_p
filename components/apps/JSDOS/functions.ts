import type { AsyncZipOptions, Unzipped } from "fflate";
import { unzip, zip } from "fflate";
import type { AsyncZippable } from "fflate/node";
import { join } from "path";

import { zipConfigFiles } from "./config";

const isFileInZip = (buffer: Buffer, zipFilePath: string): Promise<boolean> =>
  new Promise((resolve) => {
    unzip(buffer, (_unzipError, content) =>
      resolve(Object.keys(content).includes(zipFilePath)),
    );
  });

export const addFileToZippable = (
  path: string,
  file: Buffer,
): AsyncZippable => {
  const zippableData: AsyncZippable = {};

  path.split("/").reduce((walkedPath, partPath, index, { length }) => {
    const endOfPath = index === length - 1;
    const currentPath = join(walkedPath, partPath, endOfPath ? "" : "/");
    zippableData[currentPath] = endOfPath
      ? [file, { level: 0 }]
      : new Uint8Array();
    return currentPath;
  }, "");

  return zippableData;
};

export const unzipAsync = (zipFile: Buffer): Promise<Unzipped> =>
  new Promise((resolve, reject) => {
    unzip(zipFile, (error, data) => (error ? reject(error) : resolve(data)));
  });

const zipAsync = (
  data: AsyncZippable,
  opts: AsyncZipOptions = {},
): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    zip(data, opts, (error, zipData) =>
      error ? reject(error) : resolve(zipData),
    );
  });

const addFileToZip = async (
  buffer: Buffer,
  filePath: string,
  zipFilePath: string,
  readFile: (path: string) => Promise<Buffer>,
): Promise<Buffer> =>
  Buffer.from(
    await zipAsync({
      ...(await unzipAsync(buffer)),
      ...addFileToZippable(zipFilePath, await readFile(filePath)),
    }),
  );

export const addJSDOSConfig = async (
  buffer: Buffer,
  readFile: (path: string) => Promise<Buffer>,
): Promise<Buffer> =>
  Object.entries(zipConfigFiles).reduce(
    async (newBuffer, [zipPath, fsPath]) =>
      (await isFileInZip(await newBuffer, zipPath))
        ? newBuffer
        : addFileToZip(await newBuffer, fsPath, zipPath, readFile),
    Promise.resolve(buffer),
  );
