import type { FSModule } from "browserfs/dist/node/core/FS";

export type FileSystemStateType = {
  fs?: FSModule;
  mountFs: (url: string, callback: () => void) => void;
  unMountFs: (url: string) => void;
};

export type Extensions = {
  [extention: string]: {
    icon: string;
    process: string[];
  };
};
