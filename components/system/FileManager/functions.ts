import type { FSModule } from "browserfs/dist/node/core/FS";
import type { Stats } from "fs";
import ini from "ini";
import { basename, extname, join } from "path";

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

import type { FileInfo, Files, InternetShortcut, SelectionRect } from "./types";

export const iterateFileNames = (name: string, iteration: number): string => {
  const extension = extname(name);
  const fileName = basename(name, extension);

  return `${fileName} (${iteration})${extension}`;
};

export const getInfoWithoutExtension = (
  path: string,
  isDirectory: boolean,
): FileInfo => ({
  icon: `/System/Icons/${isDirectory ? "ICON16772_1.ico" : "ICON2_1.ico"}`,
  pid: isDirectory ? "FileExplorer" : "",
  url: path,
});

export const getInfoWithExtension = (
  fs: FSModule,
  path: string,
  extension: string,
  callback: React.Dispatch<React.SetStateAction<FileInfo>>,
): void => {
  const getInfoByFileExtension = (icon?: string): void =>
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
        } = ini.parse(contents.toString()) as InternetShortcut;
        callback({ icon, pid, url });
      }
    });
  } else if (IMAGE_FILE_EXTENSION.has(extension)) {
    getInfoByFileExtension("/System/Icons/ICON132_1.ico");
    fs.readFile(path, (error, contents = Buffer.from("")) => {
      if (!error) getInfoByFileExtension(bufferToUrl(contents));
    });
  } else if (extension === ".mp3") {
    getInfoByFileExtension("/System/Icons/music_48.png");
    fs.readFile(path, (error, contents = Buffer.from("")) => {
      if (!error) {
        import("music-metadata-browser").then(({ parseBuffer, selectCover }) =>
          parseBuffer(
            contents,
            { mimeType: MP3_MIME_TYPE, size: contents.length },
            { skipPostHeaders: true },
          ).then(({ common: { picture } = {} }) => {
            const { data: coverPicture } = selectCover(picture) || {};
            if (coverPicture) getInfoByFileExtension(bufferToUrl(coverPicture));
          }),
        );
      }
    });
  } else getInfoByFileExtension();
};

export const filterSystemFiles =
  (directory: string) =>
  (file: string): boolean =>
    !SYSTEM_FILES.has(join(directory, file));

const sortCaseInsensitive = (
  [a]: [string, Stats],
  [b]: [string, Stats],
): number => a.localeCompare(b, "en", { sensitivity: "base" });

export const sortContents = (contents: Files, sortOrder: string[]): Files => {
  if (sortOrder.length > 0) {
    const contentOrder = Object.keys(contents);

    return Object.fromEntries(
      [
        ...sortOrder.filter((entry) => contentOrder.includes(entry)),
        ...contentOrder.filter((entry) => !sortOrder.includes(entry)),
      ].map((entry) => [entry, contents[entry]]),
    );
  }

  const files: [string, Stats][] = [];
  const folders: [string, Stats][] = [];

  Object.entries(contents).forEach((entry) => {
    const [, stat] = entry;
    if (stat.isDirectory()) {
      folders.push(entry);
    } else {
      files.push(entry);
    }
  });

  return Object.fromEntries([
    ...folders.sort(sortCaseInsensitive),
    ...files.sort(sortCaseInsensitive),
  ]);
};

export const isSelectionIntersecting = (
  element: DOMRect,
  containerElement: DOMRect,
  selection: SelectionRect,
): boolean => {
  const { x = 0, y = 0, width = 0, height = 0 } = selection;
  const selectionRect = new DOMRect(x, y, Number(width), Number(height));

  return !(
    element.left - containerElement.left >= selectionRect.right ||
    element.top - containerElement.top >= selectionRect.bottom ||
    element.right - containerElement.left <= selectionRect.left ||
    element.bottom - containerElement.top <= selectionRect.top
  );
};

export const truncateName = (name: string): string => {
  const maxLength = 15;
  const useFullName = name.length <= maxLength;

  return useFullName ? name : `${name.slice(0, maxLength)}...`;
};

export const createLink = (
  contents: Buffer,
  setState: React.Dispatch<React.SetStateAction<string>>,
  fileName?: string,
): void => {
  const link = document.createElement("a");

  link.href = bufferToUrl(contents);
  link.download = fileName || "download.zip";

  link.click();

  setState(link.href);
};
