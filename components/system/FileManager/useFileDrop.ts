import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";

import type { FileDrop } from "./types";

const haltDragEvent = (event: React.DragEvent<HTMLElement>): void => {
  event.preventDefault();
  event.stopPropagation();
};

const useFileDrop = (
  newPath: (path: string, fileBuffer?: Buffer) => void,
): FileDrop => {
  const onDrop = (event: React.DragEvent<HTMLElement>) => {
    haltDragEvent(event);

    if (event?.dataTransfer?.files.length > 0) {
      const files = [...event.dataTransfer.files];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          ({ target }) => {
            newPath(
              file.name,
              Buffer.from(new Uint8Array(target?.result as ArrayBuffer)),
            );
          },
          ONE_TIME_PASSIVE_EVENT,
        );

        reader.readAsArrayBuffer(file);
      });
    }
  };
  return {
    onDragOver: haltDragEvent,
    onDrop,
  };
};

export default useFileDrop;
