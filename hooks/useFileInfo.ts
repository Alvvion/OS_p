import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";
import type { FileInfo } from "@/types/hooks/FileInfo";
import { IMAGE_FILE_EXTENSION } from "@/utils/constants";
import { getFileByExtension, getShortcut } from "@/utils/fileFunctions";

const useFileInfo = (path: string): FileInfo => {
  const { fs } = useFileSystem();
  const [info, setInfo] = useState<FileInfo>({
    icon: "",
    pid: "",
    url: "",
  });

  useEffect(() => {
    if (fs) {
      const extension = extname(path);

      if (extension === ".url") {
        getShortcut(path, fs)
          .then(({ BaseURL: pid, URL: url, IconFile: icon }) =>
            setInfo({ icon, pid, url })
          )
          .catch(() =>
            setInfo({
              icon: "/assets/Blank.png",
              pid: getFileByExtension(extension),
              url: path,
            })
          );
      } else if (IMAGE_FILE_EXTENSION.includes(extension)) {
        setInfo({ icon: path, pid: "ImageViewer", url: path });
      } else {
        setInfo({
          icon: "/assets/Blank.png",
          pid: getFileByExtension(extension),
          url: path,
        });
      }
    }
  }, [path, fs]);
  return info;
};

export default useFileInfo;
