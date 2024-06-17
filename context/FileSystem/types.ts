import type { FSModule } from "browserfs/dist/node/core/FS";

export type FileSystemStateType = { fs?: FSModule };

export type Extensions = {
  [extention: string]: {
    icon: string;
    process: string[];
  };
};
