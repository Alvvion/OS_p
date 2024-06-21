import type * as IBrowserFS from "browserfs";
import type { FSModule } from "browserfs/dist/node/core/FS";
import { useEffect, useState } from "react";

import * as BrowserFS from "@/public/libs/browserfs/browserfs.min.js";

import FileSystemConfig from "./config";
import type { FileSystemStateType } from "./types";

const { BFSRequire, configure } = BrowserFS as typeof IBrowserFS;

const useFileSystemState = (): FileSystemStateType => {
  const [fs, setFs] = useState<FSModule>();

  useEffect(() => {
    if (!fs) {
      configure(FileSystemConfig, () => setFs(BFSRequire("fs")));
    }
  }, [fs]);

  return { fs };
};

export default useFileSystemState;
