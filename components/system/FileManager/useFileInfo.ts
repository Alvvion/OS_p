import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import {
  getInfoWithExtension,
  getInfoWithoutExtension,
} from "@/context/FileSystem/functions";
import { MOUNTABLE_EXTENSIONS } from "@/utils/constants";

import type { FileInfo } from "./types";

const useFileInfo = (path: string, isDirectory: boolean): FileInfo => {
  const { fs } = useFileSystem();
  const [info, setInfo] = useState<FileInfo>({
    icon: "",
    pid: "",
    url: "",
  });

  useEffect(() => {
    if (fs) {
      const extension = extname(path).toLowerCase();

      if (!extension || (isDirectory && !MOUNTABLE_EXTENSIONS.has(extension))) {
        getInfoWithoutExtension(fs, path, isDirectory, setInfo);
      } else {
        getInfoWithExtension(fs, path, extension, setInfo);
      }
    }
  }, [path, fs, isDirectory]);
  return info;
};

export default useFileInfo;
