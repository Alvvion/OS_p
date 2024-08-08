import type { FSModule } from "browserfs/dist/node/core/FS";

export type FileSystemStateType = { fs: FSModule | null };

export type Shortcut = {
  BaseURL: string;
  IconFile: string;
  URL: string;
};
