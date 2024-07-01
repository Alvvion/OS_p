export type FileManagerProps = {
  url: string;
  view?: "default" | "start";
};

export type FileActions = {
  deleteFile: (path: string) => void;
  renameFile: (path: string, name?: string) => void;
  downloadFile: (path: string) => void;
};

export type FocusedEntry = {
  onBlurCapture: React.FocusEventHandler;
  onClick: React.MouseEventHandler;
  selected: boolean;
};

export type FileEntryProps = FocusedEntry & {
  name: string;
  path: string;
  renaming: boolean;
  fileActions: FileActions;
  setRenaming: React.Dispatch<React.SetStateAction<string>>;
  selecting: boolean;
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
  newPath: (path: string, fileBuffer?: Buffer) => void;
  addToFolder: () => void;
};

export type Folder = {
  fileActions: FileActions;
  folderActions: FolderActions;
  files: string[];
  updateFiles: (appendFile?: string) => void;
};

export type Selection = {
  isSelecting: boolean;
  selectionStyling: React.CSSProperties;
  selectionEvents: {
    onMouseDown: React.MouseEventHandler<HTMLElement>;
    onMouseMove?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseUp?: () => void;
  };
};
