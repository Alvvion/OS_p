import type { FSModule } from "browserfs/dist/node/core/FS";
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

import type {
  FileInfo,
  Files,
  FileStats,
  InternetShortcut,
  SelectionRect,
  SortBy,
  SortFunction,
} from "./types";

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

const sortByName = ([a]: FileStats, [b]: FileStats): number =>
  a.localeCompare(b, "en", { sensitivity: "base" });

const sortBySize = (
  [, { size: aSize }]: FileStats,
  [, { size: bSize }]: FileStats,
): number => aSize - bSize;

const sortByType = ([a]: FileStats, [b]: FileStats): number =>
  extname(a).localeCompare(extname(b), "en", { sensitivity: "base" });

const sortByDate = (
  [, { mtimeMs: aTime }]: FileStats,
  [, { mtimeMs: bTime }]: FileStats,
): number => aTime - bTime;

const sortFunctionMap: Record<string, SortFunction> = {
  name: sortByName,
  size: sortBySize,
  type: sortByType,
  date: sortByDate,
};

export const sortContents = (
  contents: Files,
  sortOrder: string[],
  sortFunction?: SortFunction,
): Files => {
  if (sortOrder.length > 0) {
    const contentOrder = Object.keys(contents);

    return Object.fromEntries(
      [
        ...sortOrder.filter((entry) => contentOrder.includes(entry)),
        ...contentOrder.filter((entry) => !sortOrder.includes(entry)),
      ].map((entry) => [entry, contents[entry]]),
    );
  }

  const files: FileStats[] = [];
  const folders: FileStats[] = [];
  const preSort = sortFunction && sortFunction !== sortByName;

  Object.entries(contents).forEach((entry) => {
    const [, stat] = entry;
    if (stat.isDirectory()) {
      folders.push(entry);
    } else {
      files.push(entry);
    }
  });

  const sortedContents = [
    ...(preSort
      ? folders.sort(sortByName).sort(sortFunction)
      : folders.sort(sortByName)),
    ...(preSort
      ? files.sort(sortByName).sort(sortFunction)
      : files.sort(sortByName)),
  ];

  return Object.fromEntries(sortedContents);
};

export const sortFiles = (files: Files, sortBy: SortBy): Files =>
  sortBy in sortFunctionMap
    ? sortContents(files, [], sortFunctionMap[sortBy])
    : files;

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
