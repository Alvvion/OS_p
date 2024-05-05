import type { FSModule } from "browserfs/dist/node/core/FS";
import { basename, dirname, extname } from "path";

export const iterateFileNames = (path: string, iteration: number): string => {
  const extention = extname(path);
  const filename = basename(path, extention);

  return `${dirname(path)}/${filename} (${iteration})${extention}`;
};

export const writeUniqueName = (
  path: string,
  fileBuffer: Buffer,
  updateFiles: (appendFiles?: string) => void,
  fs: FSModule | null,
  iteration = 0
): void => {
  const writePath = !iteration ? path : iterateFileNames(path, iteration);

  fs?.stat(writePath, (statError) => {
    if (statError?.code === "ENOENT") {
      fs?.writeFile(
        writePath,
        fileBuffer,
        (writeError) => !writeError && updateFiles(writePath)
      );
    } else {
      writeUniqueName(path, fileBuffer, updateFiles, fs, iteration + 1);
    }
  });
};
