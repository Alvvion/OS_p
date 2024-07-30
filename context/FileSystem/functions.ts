import type { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";
import { extname, join } from "path";

import { monacoExtensions } from "@/components/apps/MonacoEditor/config";
import { MP3_MIME_TYPE } from "@/components/apps/Webamp/constants";
import type {
  FileInfo,
  InternetShortcut,
  ShellClassInfo,
} from "@/components/system/FileManager/types";
import {
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

const getDefaultFileViewer = (extension: string): string => {
  if (monacoExtensions.has(extension)) return "MonacoEditor";
  if (IMAGE_FILE_EXTENSION.has(extension)) return "Photos";
  if (VIDEO_FILE_EXTENSIONS.has(extension)) return "VideoPlayer";

  return "";
};

export const getIconByFileExtension = (extension: string): string => {
  const { icon: extensionIcon = "", process: [defaultProcess = ""] = [] } =
    extension in extensions ? extensions[extension as ExtensionType] : {};

  if (extensionIcon) return extensionIcon;
  return (
    processDir[defaultProcess || getDefaultFileViewer(extension)]?.icon ||
    "/System/Icons/ICON2_1.ico"
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
    InternetShortcut: { BaseURL: pid = "", IconFile: icon = "", URL: url = "" },
  } = ini.parse(contents.toString()) as InternetShortcut;
  if (!icon && pid) {
    return { icon: processDir[pid]?.icon, pid, url };
  }

  return { icon, pid, url };
};

export const getIconFromIni = (
  fs: FSModule,
  directory: string,
): Promise<string> =>
  new Promise((resolve) => {
    fs.readFile(
      join(directory, "desktop.ini"),
      (error, contents = Buffer.from("")) => {
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
    const setFolderInfo = (icon: string): void =>
      callback({ icon, pid: "FileExplorer", url: path });

    setFolderInfo("/System/Icons/folder.ico");
    getIconFromIni(fs, path).then(setFolderInfo);
  } else {
    callback({ icon: "/System/Icons/ICON2_1.ico", pid: "", url: "" });
  }
};

export const getInfoWithExtension = (
  fs: FSModule,
  path: string,
  extension: string,
  callback: (value: FileInfo) => void,
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
        const { icon, pid, url } = getShortcutInfo(contents);
        const urlExt = extname(url);

        callback({ icon, pid, url });

        if (
          IMAGE_FILE_EXTENSION.has(urlExt) ||
          VIDEO_FILE_EXTENSIONS.has(urlExt) ||
          urlExt === ".mp3"
        ) {
          getInfoWithExtension(fs, url, urlExt, ({ icon: urlIcon }) => {
            if (urlIcon && urlIcon !== icon) {
              callback({ icon: urlIcon, pid, url });
            }
          });
        }
      }
    });
  } else if (IMAGE_FILE_EXTENSION.has(extension)) {
    getInfoByFileExtension("/System/Icons/ICON132_1.ico");
    fs.readFile(path, (error, contents = Buffer.from("")) => {
      if (!error) getInfoByFileExtension(bufferToUrl(contents));
    });
  } else if (VIDEO_FILE_EXTENSIONS.has(extension)) {
    getInfoByFileExtension("/System/Icons/vlc.png");
    fs.readFile(path, (error, contents = Buffer.from("")) => {
      if (!error) {
        const video = document.createElement("video");

        video.currentTime = PREVIEW_FRAME_SECOND;
        video.addEventListener(
          "loadeddata",
          () => {
            const canvas = document.createElement("canvas");

            canvas
              .getContext("2d")
              ?.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) =>
                blob && getInfoByFileExtension(URL.createObjectURL(blob)),
            );
          },
          ONE_TIME_PASSIVE_EVENT,
        );

        video.src = bufferToUrl(contents);
        video.load();
      }
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

    filePaths.forEach((path) => callback(path));
  }
};
