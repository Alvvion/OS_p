import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";

import extensions from "./extensions";

export const getIconByFileExtension = (extention: string): string =>
  extensions[extention]?.icon || "/assets/ICON2_1.ico";

export const getProcessByFileExtension = (extention: string): string =>
  extensions[extention]?.process[0] || "";

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
    (event?.currentTarget as HTMLInputElement);
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
    const filePath = eventTarget?.getData("text");

    if (filePath) callback(filePath);
  }
};
