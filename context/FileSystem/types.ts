import type { FSModule } from "browserfs/dist/node/core/FS";

export type FileSystemStateType = {
  addFile: (callback: (name: string, buffer?: Buffer) => void) => void;
  fs?: FSModule;
  mountFs: (url: string) => void;
  resetFs: () => Promise<void>;
  setFileInput: React.Dispatch<
    React.SetStateAction<HTMLInputElement | undefined>
  >;
  unMountFs: (url: string) => void;
};

export type Extensions = {
  [extention: string]: {
    icon: string;
    process: string[];
  };
};
