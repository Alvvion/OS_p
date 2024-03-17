import { useCallback } from "react";

import { useFileSystem } from "@/contexts/fileSystem";
import type { FileDrop } from "@/types/hooks/FileDrop";

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
      const { files: [file] = [] } = event.dataTransfer || {};
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        fs?.writeFile(
          `${directory}/${file.name}`,
          Buffer.from(new Uint8Array(target?.result as ArrayBuffer)),
          (e) => !e && updateFiles(file.name)
        );
      };

      reader.readAsArrayBuffer(file);
    },
    [directory, fs, updateFiles]
  );
  return {
    onDragOver: haltDragEvent,
    onDrop,
  };
};

export default useFileDrop;
