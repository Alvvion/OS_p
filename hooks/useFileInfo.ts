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
  });

  useEffect(() => {
    if (fs) {
      const extension = extname(path);

      if (extension === ".url") {
        getShortcut(path, fs)
          .then(({ URL: pid, IconFile: icon }) => setInfo({ icon, pid }))
          .catch(() =>
            setInfo({
              icon: "/assets/Blank.png",
              pid: getFileByExtension(extension),
            })
          );
      } else if (IMAGE_FILE_EXTENSION.includes(extension)) {
        setInfo({ icon: path, pid: "ImageViewer" });
      } else {
        setInfo({
          icon: "/assets/Blank.png",
          pid: getFileByExtension(extension),
        });
      }
    }
  }, [path, fs]);
  return info;
};

export default useFileInfo;
