import { join } from "path";
import { useRef } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";

import useFileDrop from "../system/FileManager/useFileDrop";
import type { ContainerProps } from "./types";

const TEMP_PATH = "/temp";

const AppContianer: React.FC<ContainerProps> = ({
  id,
  useHook,
  children,
  ...restProps
}) => {
  const {
    processes: { [id]: { url: currentUrl = "" } = {} },
    url,
  } = useProcesses();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { fs, mkdirRecursive, updateFolder } = useFileSystem();

  const fileDrop = useFileDrop((filePath: string, fileData?: Buffer) => {
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
  });

  useHook(id, currentUrl, containerRef);

  return (
    <div ref={containerRef} {...fileDrop} {...restProps}>
      {children}
    </div>
  );
};

export default AppContianer;
