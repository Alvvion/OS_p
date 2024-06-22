import type { FSModule } from "browserfs/dist/node/core/FS";
import { unzip, zip } from "fflate";
import type { AsyncZippable } from "fflate/node";
import { join } from "path";

import { defaultConfig, globals, zipConfigPath } from "./config";

const isFileInZip = (buffer: Buffer, zipFilePath: string): Promise<boolean> =>
  new Promise((resolve) => {
    unzip(buffer, (_unzipError, content) =>
      resolve(Object.keys(content).includes(zipFilePath)),
    );
  });

export const addFileToZippable = (path: string, file: Buffer) => {
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
      fs.readFile(filePath, (_readError, contents = Buffer.from("")) => {
        zip(
          { ...zipData, ...addFileToZippable(zipFilePath, contents) },
          (_zipError, newZipData) => {
            resolve(newZipData as Buffer);
          },
        );
      });
    });
  });

export const addJSDOSConfig = async (
  buffer: Buffer,
  fs: FSModule,
): Promise<Buffer> =>
  (await isFileInZip(buffer, zipConfigPath))
    ? buffer
    : addFileToZip(buffer, defaultConfig, zipConfigPath, fs);

export const cleanUpLoader = () =>
  globals.forEach((global) => delete (window as never)[global]);
