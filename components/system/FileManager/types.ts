export type FileManagerProps = {
  directory: string;
};

export type FileEntryProps = {
  name: string;
  path: string;
  deleteFile: (path: string) => void;
  renameFile: (path: string, name?: string) => void;
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
