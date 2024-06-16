import type { FSModule } from "browserfs/dist/node/core/FS";

export type FileSystemStateType = { fs?: FSModule };

export type Shortcut = {
  BaseURL: string;
  IconFile: string;
  URL: string;
};

export type Extensions = {
  [extention: string]: {
    icon: string;
    process: string[];
  };
};
