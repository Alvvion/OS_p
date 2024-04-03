import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";
import {
  getIconByFileExtension,
  getProcessByFileExtension,
  getShortcut,
} from "@/contexts/fileSystem/functions";
import type { FileInfo } from "@/types/hooks/FileInfo";
import { IMAGE_FILE_EXTENSION } from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

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

      if (extension === ".url") {
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
