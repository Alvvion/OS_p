import type { FSModule } from "browserfs/dist/node/core/FS";

import type extensions from "./extensions";

export type UpdateFiles = (newFile?: string, oldFile?: string) => void;

export type FilePasteOperations = Record<string, "copy" | "move">;

export type FileSystemStateType = {
  addFile: (callback: (name: string, buffer?: Buffer) => void) => void;
  addFsWatcher: (folder: string, updateFiles: UpdateFiles) => void;
  copyEntries: (entries: string[]) => void;
  fs?: FSModule;
  mkdirRecursive: (path: string, callback: () => void) => void;
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
};

export type ExtensionType = keyof typeof extensions;
