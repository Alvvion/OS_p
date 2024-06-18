import { useCallback } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";

import { writeUniqueName } from "./functions";
import type { FileDrop } from "./types";

const haltDragEvent = (event: React.DragEvent<HTMLElement>): void => {
  event.preventDefault();
  event.stopPropagation();
};

const useFileDrop = (
  directory: string,
  updateFiles: (appendFile?: string) => void
): FileDrop => {
  const { fs } = useFileSystem();
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      haltDragEvent(event);

      if (event?.dataTransfer?.files.length) {
        const files = [...event.dataTransfer.files];

        files.forEach((file) => {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            ({ target }) => {
              writeUniqueName(
                `${directory}/${file.name}`,
                Buffer.from(new Uint8Array(target?.result as ArrayBuffer)),
                updateFiles,
                fs
              );
            },
            ONE_TIME_PASSIVE_EVENT
          );

          reader.readAsArrayBuffer(file);
        });
      }
    },
    [directory, fs, updateFiles]
  );
  return {
    onDragOver: haltDragEvent,
    onDrop,
  };
};

export default useFileDrop;
