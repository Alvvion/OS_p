import type { Stats } from "fs";
import type { Position } from "react-rnd";

import type { Size } from "@/components/common/types";

export type FileManagerProps = {
  closing?: boolean;
  hideLoading?: boolean;
  scrollable: boolean;
  systemShortcuts?: string[];
  url: string;
  view?: "default" | "start";
};

export type Files = Record<string, Stats>;

export type FileActions = {
  archiveFiles: (paths: string[]) => Promise<void>;
  deleteFile: (path: string) => void;
  downloadFiles: (paths: string[]) => Promise<void>;
  extractFiles: (path: string) => void;
  newShortcut: (path: string, process: string) => void;
  renameFile: (path: string, name?: string) => void;
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
  onDragOver: React.DragEventHandler;
};

export type DraggableEntries = (url: string, file: string) => DraggableEntry;

export type SelectionRect = Partial<Size> & Partial<Position>;

export type FileEntryProps = FocusableEntry &
  DraggableEntry & {
    fileActions: FileActions;
    fileManagerRef: React.MutableRefObject<HTMLOListElement | null>;
    hideShortcutIcon?: boolean;
    name: string;
    path: string;
    renaming: boolean;
    selectionRect?: SelectionRect;
    setRenaming: React.Dispatch<React.SetStateAction<string>>;
    systemShortcut: boolean;
    stats: Stats;
    view: "default" | "start";
  };

export type FileInfo = {
  icon: string;
  pid: string;
  subIcons?: string[];
  url: string;
};

export type FileDropHook = {
  callback?: (path: string, buffer?: Buffer) => void;
  id?: string;
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

export type SortTypes = "name" | "size" | "type" | "date";

export type SortBy = SortTypes | `!${SortTypes}`;

export type SetSortBy = (value: SortTypes) => void;

export type FolderActions = {
  addToFolder: () => void;
  newPath: (path: string, fileBuffer?: Buffer, isRenaming?: boolean) => void;
  pasteToFolder: () => void;
  setSortBy: SetSortBy;
};

export type Folder = {
  fileActions: FileActions;
  files: Files;
  folderActions: FolderActions;
  isLoading: boolean;
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

export type UseFile = (pid: string, icon?: string) => void;

export type InternetShortcut = {
  InternetShortcut: {
    BaseURL: string;
    IconFile: string;
    URL: string;
  };
};

export type FileType = [string, Buffer];

export type FileStats = [string, Stats];

export type SortFunction = (a: FileStats, b: FileStats) => number;

export type ShellClassInfo = {
  ShellClassInfo: {
    IconFile: string;
  };
};

export type WrapData = {
  lines: string[];
  width: number;
};
