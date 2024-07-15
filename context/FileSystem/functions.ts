import { monacoExtensions } from "@/components/apps/MonacoEditor/config";
import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";

import { processDir } from "../Process/directory";
import extensions from "./extensions";
import type { ExtensionType } from "./types";

const getDefaultFileViewer = (extension: string): string =>
  monacoExtensions.has(extension) ? "MonacoEditor" : "";

export const getIconByFileExtension = (extension: string): string => {
  const { icon: extensionIcon = "", process: [defaultProcess = ""] = [] } =
    extension in extensions ? extensions[extension as ExtensionType] : {};

  if (extensionIcon) return extensionIcon;
  return (
    processDir[defaultProcess || getDefaultFileViewer(extension)]?.icon ||
    "/assets/ICON2_1.ico"
  );
};

export const getProcessByFileExtension = (extension: string): string => {
  const [defaultProcess = ""] =
    extension in extensions
      ? extensions[extension as ExtensionType].process
      : [getDefaultFileViewer(extension)];

  return defaultProcess;
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
