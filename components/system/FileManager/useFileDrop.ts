import { join } from "path";

import { useFileSystem } from "@/context/FileSystem";
import {
  haltEvent,
  handleFileInputEvent,
} from "@/context/FileSystem/functions";
import { useProcesses } from "@/context/Process";
import { TEMP_PATH } from "@/utils/constants";

import type { FileDrop, FileDropHook } from "./types";

const useFileDrop = ({ callback, id }: FileDropHook): FileDrop => {
  const { url } = useProcesses();
  const { fs, mkdirRecursive, updateFolder } = useFileSystem();

  const updateProcessUrl = (filePath: string, fileData?: Buffer): void => {
    if (id) {
      if (fileData) {
        const tempPath = join(TEMP_PATH, filePath);

        mkdirRecursive(TEMP_PATH, () => {
          fs?.writeFile(tempPath, fileData, (error) => {
            if (!error) {
              url(id, tempPath);
              updateFolder(TEMP_PATH, filePath);
            }
          });
        });
      } else {
        url(id, filePath);
      }
    }
  };

  return {
    onDragOver: haltEvent,
    onDrop: (event) =>
      handleFileInputEvent(event, callback || updateProcessUrl),
  };
};

export default useFileDrop;
