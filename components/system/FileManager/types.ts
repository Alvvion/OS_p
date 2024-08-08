export type FileManagerProps = {
  directory: string;
};

export type FileEntryProps = {
  name: string;
  path: string;
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
