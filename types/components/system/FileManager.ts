export type FileManagerProps = {
  directory: string;
};

export type FileEntryProps = {
  name: string;
  path: string;
};

export type DoubleClickType = (
  handler: React.MouseEventHandler,
  timeout?: number
) => React.MouseEventHandler;
