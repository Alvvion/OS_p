import type { FSModule } from "browserfs/dist/node/core/FS";
import JSZip from "jszip";

import { defaultConfig, zipConfigPath } from "./config";

const isFileInZip = (buffer: Buffer, zipFilePath: string): Promise<boolean> =>
  new Promise((resolve) => {
    new JSZip()
      .loadAsync(buffer)
      .then((zipFile) =>
        resolve(Object.keys(zipFile.files).includes(zipFilePath))
      );
  });

const addFileToZip = (
  buffer: Buffer,
  filePath: string,
  zipFilePath: string,
  fs: FSModule
): Promise<Buffer> =>
  new Promise((resolve) => {
    new JSZip().loadAsync(buffer).then((zipFile) => {
      fs.readFile(filePath, (_err, contents = Buffer.from("")) =>
        zipFile
          .file(zipFilePath, contents)
          .generateAsync({ type: "nodebuffer" })
          .then((newZipFile) => resolve(newZipFile))
      );
    });
  });

const addJSDOSConfig = async (buffer: Buffer, fs: FSModule): Promise<Buffer> =>
  (await isFileInZip(buffer, zipConfigPath))
    ? buffer
    : addFileToZip(buffer, defaultConfig, zipConfigPath, fs);

export default addJSDOSConfig;
