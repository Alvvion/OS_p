import type { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";
import { dirname, extname, join } from "path";

import { monacoExtensions } from "@/components/apps/MonacoEditor/config";
import { MP3_MIME_TYPE } from "@/components/apps/Webamp/constants";
import type { FileInfo } from "@/components/system/FileManager/types";
import index from "@/public/.index/fs.9p.json";
import {
  BASE_2D_CONTEXT_OPTIONS,
  EMPTY_BUFFER,
  ICON_PATH,
  IMAGE_FILE_EXTENSION,
  ONE_TIME_PASSIVE_EVENT,
  PREVIEW_FRAME_SECOND,
  SHORTCUT,
  VIDEO_FILE_EXTENSIONS,
} from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

import { processDir } from "../Process/directory";
import type { ExtensionType } from "./extensions";
import extensions from "./extensions";
import type { FS9P, InternetShortcut, ShellClassInfo } from "./types";

const getDefaultFileViewer = (extension: string): string => {
  if (monacoExtensions.has(extension)) return "MonacoEditor";
  if (IMAGE_FILE_EXTENSION.has(extension)) return "Photos";
  if (VIDEO_FILE_EXTENSIONS.has(extension)) return "VideoPlayer";

  return "";
};

const IDX_MTIME = 2;
const IDX_TARGET = 6;

export const get9pModifiedTime = (path: string): number => {
  let fsPath = index.fsroot as FS9P[];
  let mTime = 0;

  path
    .split("/")
    .filter(Boolean)
    .forEach((pathPart) => {
      const pathBranch = fsPath.find(([name]) => name === pathPart);

      if (pathBranch) {
        const isBranch = Array.isArray(pathBranch[IDX_TARGET]);

        if (!isBranch) mTime = pathBranch[IDX_MTIME];
        fsPath = isBranch ? (pathBranch[IDX_TARGET] as FS9P[]) : [];
      }
    });

  return mTime;
};

export const getIconByFileExtension = (extension: string): string => {
  const { icon: extensionIcon = "", process: [defaultProcess = ""] = [] } =
    extension in extensions ? extensions[extension as ExtensionType] : {};

  if (extensionIcon) return extensionIcon;
  return (
    processDir[defaultProcess || getDefaultFileViewer(extension)]?.icon ||
    `${ICON_PATH}ICON2_1.ico`
  );
};

export const getProcessByFileExtension = (extension: string): string => {
  const [defaultProcess = ""] =
    extension in extensions
      ? extensions[extension as ExtensionType].process
      : [getDefaultFileViewer(extension)];

  return defaultProcess;
};

export const getShortcutInfo = (contents: Buffer): FileInfo => {
  const {
    InternetShortcut: {
      BaseURL: pid = "",
      IconFile: icon = "",
      Type: type = "",
      URL: url = "",
    },
  } = ini.parse(contents.toString()) as InternetShortcut;
  if (!icon && pid) {
    return { icon: processDir[pid]?.icon, pid, type, url };
  }

  return { icon, pid, type, url };
};

export const getIconFromIni = (
  fs: FSModule,
  directory: string,
): Promise<string> =>
  new Promise((resolve) => {
    fs.readFile(
      join(directory, "desktop.ini"),
      (error, contents = EMPTY_BUFFER) => {
        if (!error) {
          const {
            ShellClassInfo: { IconFile = "" },
          } = ini.parse(contents.toString()) as ShellClassInfo;

          if (IconFile) resolve(IconFile);
        }
      },
    );
  });

export const getInfoWithoutExtension = (
  fs: FSModule,
  path: string,
  isDirectory: boolean,
  callback: (value: FileInfo) => void,
): void => {
  if (isDirectory) {
    const setFolderInfo = (icon: string, getIcon?: () => void): void =>
      callback({ getIcon, icon, pid: "FileExplorer", url: path });

    setFolderInfo(`${ICON_PATH}folder.ico`, () =>
      getIconFromIni(fs, path).then(setFolderInfo),
    );
  } else {
    callback({ icon: `${ICON_PATH}ICON2_1.ico`, pid: "", url: "" });
  }
};

export const getInfoWithExtension = (
  fs: FSModule,
  path: string,
  extension: string,
  callback: (value: FileInfo) => void,
): void => {
  const subIcons: string[] = [];
  const getInfoByFileExtension = (icon?: string, getIcon?: () => void): void =>
    callback({
      getIcon,
      icon: icon || getIconByFileExtension(extension),
      pid: getProcessByFileExtension(extension),
      subIcons,
      url: path,
    });

  if (extension === SHORTCUT) {
    fs.readFile(path, (err, contents = EMPTY_BUFFER) => {
      subIcons.push(`${ICON_PATH}shortcut.png`);
      if (err) getInfoByFileExtension();
      else {
        const { icon, pid, url } = getShortcutInfo(contents);
        const urlExt = extname(url);

        if (pid === "FileExplorer") {
          const getIcon = (): void => {
            getIconFromIni(fs, url).then((iniIcon) =>
              callback({ getIcon, icon: iniIcon, pid, subIcons, url }),
            );
          };

          callback({ getIcon, icon, pid, subIcons, url });
        } else if (
          IMAGE_FILE_EXTENSION.has(urlExt) ||
          VIDEO_FILE_EXTENSIONS.has(urlExt) ||
          urlExt === ".mp3"
        ) {
          getInfoWithExtension(fs, url, urlExt, (fileInfo) => {
            const { icon: urlIcon, getIcon } = fileInfo;
            if (urlIcon && urlIcon !== icon) {
              callback({ getIcon, icon: urlIcon, pid, subIcons, url });
            }
          });
        } else {
          callback({ icon, pid, subIcons, url });
        }
      }
    });
  } else if (IMAGE_FILE_EXTENSION.has(extension)) {
    getInfoByFileExtension(`${ICON_PATH}ICON132_1.ico`, () => {
      fs.readFile(path, (error, contents = EMPTY_BUFFER) => {
        if (!error) getInfoByFileExtension(bufferToUrl(contents));
      });
    });
  } else if (VIDEO_FILE_EXTENSIONS.has(extension)) {
    getInfoByFileExtension(`${ICON_PATH}vlc.png`, () =>
      fs.readFile(path, (error, contents = EMPTY_BUFFER) => {
        if (!error) {
          const video = document.createElement("video");

          video.currentTime = PREVIEW_FRAME_SECOND;
          video.addEventListener(
            "loadeddata",
            () => {
              const canvas = document.createElement("canvas");

              canvas.height = video.videoHeight;
              canvas.width = video.videoWidth;
              canvas
                .getContext("2d", BASE_2D_CONTEXT_OPTIONS)
                ?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
              canvas.toBlob((blob) => {
                if (blob instanceof Blob) {
                  getInfoByFileExtension(URL.createObjectURL(blob));
                }
              });
            },
            ONE_TIME_PASSIVE_EVENT,
          );
          video.src = bufferToUrl(contents);
          video.load();
        }
      }),
    );
  } else if (extension === ".mp3") {
    getInfoByFileExtension(`${ICON_PATH}music_48.png`, () =>
      fs.readFile(path, (error, contents = EMPTY_BUFFER) => {
        if (!error) {
          import("music-metadata-browser").then(
            ({ parseBuffer, selectCover }) =>
              parseBuffer(
                contents,
                { mimeType: MP3_MIME_TYPE, size: contents.length },
                { skipPostHeaders: true },
              ).then(({ common: { picture } = {} }) => {
                const { data: coverPicture } = selectCover(picture) || {};
                if (coverPicture)
                  getInfoByFileExtension(bufferToUrl(coverPicture));
              }),
          );
        }
      }),
    );
  } else getInfoByFileExtension();
};

export const haltEvent = (
  event: Event | React.DragEvent | React.KeyboardEvent | React.MouseEvent,
): void => {
  event.preventDefault();
  event.stopPropagation();
};

export const handleFileInputEvent = (
  event: Event | React.DragEvent,
  callback: (fileName: string, buffer?: Buffer) => void,
): void => {
  haltEvent(event);

  const eventTarget =
    (event as React.DragEvent)?.dataTransfer ||
    (event.currentTarget as HTMLInputElement);
  const eventFiles = eventTarget?.files || [];

  if (eventFiles.length > 0) {
    [...eventFiles].forEach((file) => {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        ({ target }) => {
          if (target?.result instanceof ArrayBuffer) {
            callback(file.name, Buffer.from(new Uint8Array(target.result)));
          }
        },
        ONE_TIME_PASSIVE_EVENT,
      );
      reader.readAsArrayBuffer(file);
    });
  } else {
    const filePaths = eventTarget?.getData("text").split(",");

    filePaths.forEach((path) => dirname(path) !== "." && callback(path));
  }
};
