import type { FileSystemConfiguration } from "browserfs";

import publicFileSystemIndex from "@/public/.index/fs.bfs.json";

const FileSystemConfig: FileSystemConfiguration = {
  fs: "OverlayFS",
  options: {
    readable: {
      fs: "XmlHttpRequest",
      options: {
        index: publicFileSystemIndex,
      },
    },
    writable: {
      fs: "IndexedDB",
      options: {
        storeName: "browser-fs-cache",
      },
    },
  },
};

export default FileSystemConfig;
