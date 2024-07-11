import type { Position } from "react-rnd";

import type { Size } from "@/components/common/types";

export type FileManagerProps = {
  url: string;
  view?: "default" | "start";
};

export type FileActions = {
  deleteFile: (path: string) => void;
  renameFile: (path: string, name?: string) => void;
  downloadFiles: (paths: string[]) => void;
};

export type FocusableEntry = {
  isSelected: boolean;
  onBlurCapture: React.FocusEventHandler;
  onClick: React.MouseEventHandler;
};

export type FocusableEntries = (file: string) => FocusableEntry;

export type DraggableEntry = {
  draggable: boolean;
  isDragging: boolean;
  onDragStart: React.DragEventHandler;
  onDragEnd: React.DragEventHandler;
};

export type DraggableEntries = (url: string, file: string) => DraggableEntry;

export type SelectionRect = Partial<Size> & Partial<Position>;

export type FileEntryProps = FocusableEntry &
  DraggableEntry & {
    name: string;
    path: string;
    renaming: boolean;
    fileActions: FileActions;
    fileManagerRef: React.MutableRefObject<HTMLOListElement | null>;
    selectionRect?: SelectionRect;
    setRenaming: React.Dispatch<React.SetStateAction<string>>;
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
  addToFolder: () => void;
  newPath: (path: string, fileBuffer?: Buffer, isRenaming?: boolean) => void;
  pasteToFolder: () => void;
};

export type Folder = {
  fileActions: FileActions;
  files: string[];
  folderActions: FolderActions;
  updateFiles: (newFile?: string, oldFile?: string) => void;
};

export type Selection = {
  isSelecting: boolean;
  selectionRect?: SelectionRect;
  selectionStyling: React.CSSProperties;
  selectionEvents: {
    onMouseDown: React.MouseEventHandler<HTMLElement>;
    onMouseMove?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseUp?: () => void;
  };
};

export type UseFile = (pid: string) => void;

export type InternetShortcut = {
  InternetShortcut: {
    BaseURL: string;
    IconFile: string;
    URL: string;
  };
};

export type FileType = [string, Buffer];
