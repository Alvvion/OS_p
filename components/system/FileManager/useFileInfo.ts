import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";

import { getInfoWithExtension, getInfoWithoutExtension } from "./functions";
import type { FileInfo } from "./types";

const useFileInfo = (path: string): FileInfo => {
  const { fs } = useFileSystem();
  const [info, setInfo] = useState<FileInfo>({
    icon: "",
    pid: "",
    url: "",
  });

  useEffect(() => {
    if (fs) {
      const extension = extname(path).toLowerCase();

      if (!extension) {
        getInfoWithoutExtension(fs, path, setInfo);
      } else getInfoWithExtension(fs, path, extension, setInfo);
    }
  }, [path, fs]);
  return info;
};

export default useFileInfo;
