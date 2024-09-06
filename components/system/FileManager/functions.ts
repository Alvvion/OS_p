import type { Stats } from "fs";
import { basename, extname, join } from "path";

import {
  BASE_2D_CONTEXT_OPTIONS,
  NON_BREAKING_HYPHEN,
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

const sortSystemShortcuts = (
  [, { systemShortcut: aSystem }]: FileStats,
  [, { systemShortcut: bSystem }]: FileStats,
): number => (aSystem === bSystem ? 0 : aSystem ? -1 : 1);

const sortFunctionMap: Record<string, SortFunction> = {
  name: sortByName,
  size: sortBySize,
  type: sortByType,
  date: sortByDate,
};

export const sortContents = (
  contents: Files,
  // eslint-disable-next-line default-param-last
  sortOrder: string[] = [],
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
  ].sort(sortSystemShortcuts);

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
): number => {
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

  const { actualBoundingBoxLeft, actualBoundingBoxRight } =
    canvasContexts[font].measureText(text);
  return Math.abs(actualBoundingBoxLeft) + Math.abs(actualBoundingBoxRight);
};

export const getTextWrapData = (
  text: string,
  fontSize: string,
  fontFamily: string,
  maxWidth?: number,
): WrapData => {
  const lines = [""];

  const totalWidth = measureText(text, fontSize, fontFamily);

  if (!maxWidth) return { lines: [text], width: totalWidth };

  if (totalWidth > maxWidth) {
    const words = text.split(" ");
    [...text].forEach((character) => {
      const lineIndex = lines.length - 1;
      const lineText = `${lines[lineIndex]}${character}`;
      const lineWidth = measureText(lineText, fontSize, fontFamily);

      if (lineWidth > maxWidth) {
        const spacesInLine = lineText.split(" ").length - 1;
        const lineWithWords = words.splice(0, spacesInLine).join(" ");

        if (
          lines.length === 1 &&
          spacesInLine > 0 &&
          lines[0] !== lineWithWords
        ) {
          lines[0] = lineText.slice(0, lineWithWords.length);
          lines.push(lineText.slice(lineWithWords.length));
        } else {
          lines.push(character);
        }
      } else {
        lines[lineIndex] = lineText;
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
  // eslint-disable-next-line unicorn/prefer-string-replace-all
  const nonBreakingName = name.replace(/-/g, NON_BREAKING_HYPHEN);
  const { lines } = getTextWrapData(
    nonBreakingName,
    fontSize,
    fontFamily,
    maxWidth,
  );

  if (lines.length > 2) {
    const text = name.includes(" ") ? lines.slice(0, 2).join("") : lines[0];

    return `${text.slice(0, -3).trim()}...`;
  }

  return nonBreakingName;
};

export const findPathsRecursive = async (
  paths: string[],
  readdir: (path: string) => Promise<string[]>,
  stat: (path: string) => Promise<Stats>,
): Promise<string[]> => {
  const pathArrays = await Promise.all(
    paths.map(
      async (path): Promise<string[]> =>
        (await stat(path)).isDirectory()
          ? findPathsRecursive(
              (await readdir(path)).map((file) => join(path, file)),
              readdir,
              stat,
            )
          : [path],
    ),
  );

  return pathArrays.flat();
};
