import {
  haltEvent,
  handleFileInputEvent,
} from "@/context/FileSystem/functions";

import type { FileDrop } from "./types";

const useFileDrop = (
  newPath: (path: string, fileBuffer?: Buffer) => void,
): FileDrop => ({
  onDragOver: haltEvent,
  onDrop: (event) => handleFileInputEvent(event, newPath),
});

export default useFileDrop;
