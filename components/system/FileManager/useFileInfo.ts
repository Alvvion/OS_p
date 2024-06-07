import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import {
  getIconByFileExtension,
  getProcessByFileExtension,
  getShortcut,
} from "@/context/FileSystem/functions";
import { IMAGE_FILE_EXTENSION, SHORTCUT } from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

import type { FileInfo } from "./types";

const useFileInfo = (path: string): FileInfo => {
  const { fs } = useFileSystem();
  const [info, setInfo] = useState<FileInfo>({
    icon: "",
    pid: "",
    url: "",
  });

  useEffect(() => {
    const defaultFileInfo = (extension: string, icon?: string) =>
      setInfo({
        icon: icon || getIconByFileExtension(extension),
        pid: getProcessByFileExtension(extension),
        url: path,
      });
    if (fs) {
      const extension = extname(path).toLowerCase();

      if (!extension) {
        fs.stat(path, (_err, stats) => {
          const isDirectory = stats ? stats.isDirectory() : false;

          setInfo({
            icon: `/assets/${
              isDirectory ? "ICON16772_1.ico" : "/assets/ICON2_1.ico"
            }`,
            pid: isDirectory ? "FileExplorer" : "",
            url: path,
          });
        });
      } else if (extension === SHORTCUT) {
        getShortcut(path, fs)
          .then(({ BaseURL: pid, URL: url, IconFile: icon }) =>
            setInfo({ icon, pid, url })
          )
          .catch(() => defaultFileInfo(extension));
      } else if (IMAGE_FILE_EXTENSION.includes(extension)) {
        fs.readFile(path, (err, contents = Buffer.from("")) =>
          defaultFileInfo(
            extension,
            err ? "/assets/ICON132_1.ico" : bufferToUrl(contents)
          )
        );
      } else {
        defaultFileInfo(extension);
      }
    }
  }, [path, fs]);
  return info;
};

export default useFileInfo;
