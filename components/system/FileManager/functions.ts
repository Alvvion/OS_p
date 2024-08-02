import type { FSModule } from "browserfs/dist/node/core/FS";
import { basename, extname, join } from "path";

import {
  BASE_2D_CONTEXT_OPTIONS,
  SYSTEM_FILES,
  SYSTEM_PATHS,
} from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

import type {
  Files,
  FileStats,
  SelectionRect,
  SortBy,
  SortFunction,
  WrapData,
} from "./types";

export const iterateFileNames = (name: string, iteration: number): string => {
  const extension = extname(name);
  const fileName = basename(name, extension);

  return `${fileName} (${iteration})${extension}`;
};

export const filterSystemFiles =
  (directory: string) =>
  (file: string): boolean =>
    !SYSTEM_PATHS.has(join(directory, file)) && !SYSTEM_FILES.has(file);

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

const canvasContexts: Record<string, CanvasRenderingContext2D> = {};

const measureText = (
  text: string,
  fontSize: string,
  fontFamily: string,
): TextMetrics => {
  const font = `${fontSize} ${fontFamily}`;

  if (!canvasContexts[font]) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext(
      "2d",
      BASE_2D_CONTEXT_OPTIONS,
    ) as CanvasRenderingContext2D;

    context.font = font;
    canvasContexts[font] = context;
  }

  return canvasContexts[font].measureText(text);
};

export const getTextWrapData = (
  text: string,
  fontSize: string,
  fontFamily: string,
  maxWidth?: number,
): WrapData => {
  const lines = [""];

  const { width: totalWidth } = measureText(text, fontSize, fontFamily);

  if (!maxWidth) return { lines: [text], width: totalWidth };

  if (totalWidth > maxWidth) {
    [...text].forEach((character) => {
      const lineCount = lines.length - 1;
      const lineText = `${lines[lineCount]}${character}`;
      const { width: lineWidth } = measureText(lineText, fontSize, fontFamily);

      if (lineWidth > maxWidth) {
        lines.push(character);
      } else {
        lines[lineCount] = lineText;
      }
    });
  }

  return {
    lines,
    width: Math.min(maxWidth, totalWidth),
  };
};
export const truncateName = (
  name: string,
  fontSize: string,
  fontFamily: string,
  maxWidth: number,
): string => {
  const { lines } = getTextWrapData(name, fontSize, fontFamily, maxWidth);

  return lines.length > 2
    ? `${lines.slice(0, 2).join("").slice(0, -3)}...`
    : name;
};

export const findPathsRecursive = (
  fs: FSModule | undefined,
  paths: string[],
): Promise<string[]> =>
  new Promise((resolve) => {
    Promise.all(
      paths.map(
        (path): Promise<string[]> =>
          new Promise((pathResolve) => {
            fs?.stat(path, (_statError, stats) => {
              if (stats?.isDirectory()) {
                fs?.readdir(path, (_readError, files = []) =>
                  pathResolve(
                    findPathsRecursive(
                      fs,
                      files.map((file) => join(path, file)),
                    ),
                  ),
                );
              } else {
                pathResolve([path]);
              }
            });
          }),
      ),
    ).then((newPaths) => resolve(newPaths.flat()));
  });
