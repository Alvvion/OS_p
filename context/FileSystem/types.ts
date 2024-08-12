import type { FSModule } from "browserfs/dist/node/core/FS";
import type { Stats } from "fs";

export type UpdateFiles = (newFile?: string, oldFile?: string) => void;

export type FilePasteOperations = Record<string, "copy" | "move">;

export type AsyncFS = {
  exists: (path: string) => Promise<boolean>;
  mkdir: (path: string, overwrite?: boolean) => Promise<boolean>;
  readFile: (path: string) => Promise<Buffer>;
  readdir: (path: string) => Promise<string[]>;
  rename: (oldPath: string, newPath: string) => Promise<boolean>;
  rmdir: (path: string) => Promise<boolean>;
  stat: (path: string) => Promise<Stats>;
  unlink: (path: string) => Promise<boolean>;
  writeFile: (
    path: string,
    data: Buffer | string,
    overwrite?: boolean,
  ) => Promise<boolean>;
};

export type FileSystemStateType = AsyncFS & {
  addFile: (callback: (name: string, buffer?: Buffer) => void) => void;
  addFsWatcher: (folder: string, updateFiles: UpdateFiles) => void;
  copyEntries: (entries: string[]) => void;
  fs?: FSModule;
  mkdirRecursive: (path: string) => Promise<void>;
  mountFs: (url: string) => Promise<void>;
  moveEntries: (entries: string[]) => void;
  pasteList: FilePasteOperations;
  removeFsWatcher: (folder: string, updateFiles: UpdateFiles) => void;
  resetFs: () => Promise<void>;
  setFileInput: React.Dispatch<
    React.SetStateAction<HTMLInputElement | undefined>
  >;
  unMountFs: (url: string) => void;
  updateFolder: (folder: string, newFile?: string, oldFile?: string) => void;
};

export type Extension = {
  icon?: string;
  process: string[];
  type?: string;
};

export type InternetShortcut = {
  InternetShortcut: {
    BaseURL: string;
    IconFile: string;
    Type: string;
    URL: string;
  };
};

export type ShellClassInfo = {
  ShellClassInfo: {
    IconFile: string;
  };
};

export type FS9P = [
  string,
  number,
  number,
  number,
  number,
  number,
  FS9P[] | string,
];
