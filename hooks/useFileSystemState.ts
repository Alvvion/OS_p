import { BFSRequire, configure } from "browserfs";
import { FSModule } from "browserfs/dist/node/core/FS";
import { useEffect, useState } from "react";

import { FileSystemStateType } from "@/types/hooks/FileSystemState";
import FileSystemConfig from "@/utils/FileSystemConfig";

const useFileSystemState = (): FileSystemStateType => {
  const [fs, setFs] = useState<FSModule | null>(null);

  useEffect(() => {
    if (!fs) {
      configure(FileSystemConfig, () => setFs(BFSRequire("fs")));
    }
  }, [fs]);

  return { fs };
};

export default useFileSystemState;
