import type { FSModule } from "browserfs/dist/node/core/FS";
import { unzip, zip } from "fflate";
import type { AsyncZippable } from "fflate/node";
import { join } from "path";

import { EMPTY_BUFFER } from "@/utils/constants";

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

const addFileToZip = (
  buffer: Buffer,
  filePath: string,
  zipFilePath: string,
  fs: FSModule,
): Promise<Buffer> =>
  new Promise((resolve) => {
    unzip(buffer, (_unzipError, zipData) => {
      fs.readFile(filePath, (_readError, contents = EMPTY_BUFFER) => {
        zip(
          { ...zipData, ...addFileToZippable(zipFilePath, contents) },
          (_zipError, newZipData) => {
            resolve(Buffer.from(newZipData));
          },
        );
      });
    });
  });

export const addJSDOSConfig = async (
  buffer: Buffer,
  fs: FSModule,
): Promise<Buffer> =>
  Object.entries(zipConfigFiles).reduce(
    async (newBuffer, [zipPath, fsPath]) =>
      (await isFileInZip(await newBuffer, zipPath))
        ? newBuffer
        : addFileToZip(await newBuffer, fsPath, zipPath, fs),
    Promise.resolve(buffer),
  );
