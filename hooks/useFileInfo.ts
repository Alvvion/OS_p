import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";
import type { FileInfo } from "@/types/hooks/FilerInfo";
import { IMAGE_FILE_EXTENSION } from "@/utils/constants";
import { getFileByExtension, getShortcut } from "@/utils/fileFunctions";

const useFileInfo = (path: string): FileInfo => {
  const { fs } = useFileSystem();
  const [icon, setIcon] = useState("");
  const [pid, setPid] = useState("");

  useEffect(() => {
    if (fs) {
      const extension = extname(path);

      if (extension === ".url") {
        getShortcut(path, fs).then(({ URL, IconFile }) => {
          setIcon(IconFile);
          setPid(URL);
        });
      } else if (IMAGE_FILE_EXTENSION.includes(extension)) {
        setIcon(path);
        setPid("ImageVieer");
      } else {
        setPid(getFileByExtension(extension));
      }
    }
  }, [path, fs]);
  return { icon, pid };
};

export default useFileInfo;
