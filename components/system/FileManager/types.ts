import type { Stats } from "fs";
import type { Position } from "react-rnd";

import type { Size } from "@/components/common/types";

export type FileManagerProps = {
  closing?: boolean;
  hideLoading?: boolean;
  id?: string;
  isExplorerer?: boolean;
  scrollable: boolean;
  showStatusBar?: boolean;
  url: string;
  view?: "default" | "start";
};

export type FileActions = {
  archiveFiles: (paths: string[]) => Promise<void>;
  deletePath: (path: string) => Promise<void>;
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
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
};

export type DraggableEntries = (url: string, file: string) => DraggableEntry;

export type SelectionRect = Partial<Size> & Partial<Position>;

export type FileStat = Stats & {
  systemShortcut?: boolean;
};

export type FileStats = [string, FileStat];

export type Files = Record<string, FileStat>;

export type FileEntryProps = FocusableEntry &
  DraggableEntry & {
    fileActions: FileActions;
    fileManagerId?: string;
    fileManagerRef: React.MutableRefObject<HTMLOListElement | null>;
    hideShortcutIcon?: boolean;
    name: string;
    path: string;
    renaming: boolean;
    selectionRect?: SelectionRect;
    setRenaming: React.Dispatch<React.SetStateAction<string>>;
    stats: FileStat;
    view: "default" | "start";
    visible?: boolean;
  };

export type FileInfo = {
  getIcon?: () => void;
  icon: string;
  pid: string;
  subIcons?: string[];
  type?: string;
  url: string;
};

export type FileDropHook = {
  callback?: (path: string, buffer?: Buffer) => void;
  id?: string;
};

export type FileDrop = {
  onDragOver: (event: React.DragEvent<HTMLElement> | DragEvent) => void;
  onDrop: (event: React.DragEvent<HTMLElement> | DragEvent) => void;
};

export type RenameBoxProps = {
  name: string;
  path: string;
  renameFile: (path: string, name?: string) => void;
};

export type SortBy = "date" | "name" | "size" | "type";
export type SortByOrder = [SortBy, boolean];

export type SetSortBy = (sortBy: (current: SortByOrder) => SortByOrder) => void;

export type FolderActions = {
  addToFolder: () => void;
  newPath: (
    path: string,
    buffer?: Buffer,
    thenRename?: boolean,
  ) => Promise<void>;
  pasteToFolder: () => void;
  resetFiles: () => void;
  sortByOrder: [SortByOrder, SetSortBy];
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

export type ZipFile = [string, Buffer];

export type SortFunction = (a: FileStats, b: FileStats) => number;

export type WrapData = {
  lines: string[];
  width: number;
};

export type StatusBarProps = {
  count: number;
  directory: string;
  selected: string[];
};
