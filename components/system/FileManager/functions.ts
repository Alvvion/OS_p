import type { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";
import { basename, dirname, extname } from "path";

import { MP3_MIME_TYPE } from "@/components/apps/Webamp/constants";
import {
  getIconByFileExtension,
  getProcessByFileExtension,
} from "@/context/FileSystem/functions";
import {
  IMAGE_FILE_EXTENSION,
  SHORTCUT,
  SYSTEM_FILES,
} from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

import type { FileInfo } from "./types";

export const iterateFileNames = (path: string, iteration: number): string => {
  const extention = extname(path);
  const filename = basename(path, extention);

  return `${dirname(path)}/${filename} (${iteration})${extention}`;
};

export const getInfoWithoutExtension = (
  fs: FSModule,
  path: string,
  callback: React.Dispatch<React.SetStateAction<FileInfo>>,
) => {
  fs.stat(path, (_err, stats) => {
    const isDirectory = stats ? stats.isDirectory() : false;
    callback({
      icon: `/assets/${
        isDirectory ? "ICON16772_1.ico" : "/assets/ICON2_1.ico"
      }`,
      pid: isDirectory ? "FileExplorer" : "",
      url: path,
    });
  });
};

export const getInfoWithExtension = (
  fs: FSModule,
  path: string,
  extension: string,
  callback: React.Dispatch<React.SetStateAction<FileInfo>>,
) => {
  const getInfoByFileExtension = (icon?: string) =>
    callback({
      icon: icon || getIconByFileExtension(extension),
      pid: getProcessByFileExtension(extension),
      url: path,
    });

  if (extension === SHORTCUT) {
    fs.readFile(path, (err, contents = Buffer.from("")) => {
      if (err) getInfoByFileExtension();
      else {
        const {
          InternetShortcut: {
            BaseURL: pid = "",
            IconFile: icon = "",
            URL: url = "",
          },
        } = ini.parse(contents.toString());
        callback({ icon, pid, url });
      }
    });
  } else if (IMAGE_FILE_EXTENSION.has(extension)) {
    fs.readFile(path, (error, contents = Buffer.from("")) =>
      getInfoByFileExtension(
        error ? "/assets/ICON132_1.ico" : bufferToUrl(contents),
      ),
    );
  } else if (extension === ".mp3") {
    fs.readFile(path, (error, contents = Buffer.from("")) => {
      import("music-metadata-browser").then(({ parseBuffer, selectCover }) =>
        parseBuffer(
          contents,
          { mimeType: MP3_MIME_TYPE, size: contents.length },
          { skipPostHeaders: true },
        ).then(({ common: { picture } = {} }) => {
          const { data: coverPicture } = selectCover(picture) || {};

          getInfoByFileExtension(
            !error && coverPicture
              ? bufferToUrl(coverPicture)
              : "/assets/music_48.png",
          );
        }),
      );
    });
  } else getInfoByFileExtension();
};

export const filterSystemFiles =
  (directory: string) =>
  (file: string): boolean =>
    !SYSTEM_FILES.has(`${directory}${file}`);

const sortCaseInsensitive = (a: string, b: string) =>
  a.localeCompare(b, "en", { sensitivity: "base" });

export const sortContents = (contents: string[]): string[] => {
  const files: string[] = [];
  const folders: string[] = [];

  contents.forEach((entry) => {
    if (extname(entry)) files.push(entry);
    else folders.push(entry);
  });

  return [
    ...folders.sort(sortCaseInsensitive),
    ...files.sort(sortCaseInsensitive),
  ];
};
