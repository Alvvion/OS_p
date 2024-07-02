import type { FSModule } from "browserfs/dist/node/core/FS";

export type FileSystemStateType = {
  fs?: FSModule;
  mountFs: (url: string, callback: () => void) => void;
  unMountFs: (url: string) => void;
  setFileInput: React.Dispatch<
    React.SetStateAction<HTMLInputElement | undefined>
  >;
  addFile: (callback: (name: string, buffer?: Buffer) => void) => void;
};

export type Extensions = {
  [extention: string]: {
    icon: string;
    process: string[];
  };
};
