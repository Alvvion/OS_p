export type FileManagerProps = {
  url: string;
  view?: "default" | "start";
};

export type FileActions = {
  deleteFile: (path: string) => void;
  renameFile: (path: string, name?: string) => void;
  downloadFile: (path: string) => void;
};

export type FileEntryProps = {
  name: string;
  path: string;
  fileActions: FileActions;
  view: "default" | "start";
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
  newFile: (path: string) => void;
  newFolder: (path: string) => void;
};

export type Folder = {
  fileActions: FileActions;
  folderActions: FolderActions;
  files: string[];
  updateFiles: (appendFile?: string) => void;
};
