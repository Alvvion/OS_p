import type { FSModule } from "browserfs/dist/node/core/FS";

export type UpdateFiles = (newFile?: string, oldFile?: string) => void;

export type FileSystemStateType = {
  addFile: (callback: (name: string, buffer?: Buffer) => void) => void;
  addFsWatcher: (folder: string, updateFiles: UpdateFiles) => void;
  fs?: FSModule;
  mountFs: (url: string) => Promise<void>;
  removeFsWatcher: (folder: string, updateFiles: UpdateFiles) => void;
  resetFs: () => Promise<void>;
  setFileInput: React.Dispatch<
    React.SetStateAction<HTMLInputElement | undefined>
  >;
  unMountFs: (url: string) => void;
  updateFolder: (folder: string, newFile?: string, oldFile?: string) => void;
};

export type Extensions = {
  [extention: string]: {
    icon: string;
    process: string[];
  };
};
