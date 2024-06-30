import type { Events } from "@/hooks/types";

export type FileManagerProps = {
  url: string;
  view?: "default" | "start";
};

export type FileActions = {
  deleteFile: (path: string) => void;
  renameFile: (path: string, name?: string) => void;
  downloadFile: (path: string) => void;
};

export type FileEntryProps = Events & {
  name: string;
  path: string;
  renaming: boolean;
  fileActions: FileActions;
  setRenaming: React.Dispatch<React.SetStateAction<string>>;
  view: "default" | "start";
  selected: boolean;
};

export type FileInfo = {
  icon: string;
  pid: string;
  url: string;
};

export type FileDrop = {
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

export type RenameBoxProps = {
  name: string;
  path: string;
  renameFile: (path: string, name?: string) => void;
};

export type FolderActions = {
  newPath: (path: string, fileBuffer?: Buffer) => void;
  addToFolder: () => void;
};

export type Folder = {
  fileActions: FileActions;
  folderActions: FolderActions;
  files: string[];
  updateFiles: (appendFile?: string) => void;
};
