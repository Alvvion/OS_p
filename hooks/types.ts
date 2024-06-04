export type DoubleClickType = (
  handler: React.MouseEventHandler,
  timeout?: number
) => React.MouseEventHandler;

export type WindowSize = {
  updateWindowSize: (height: number, width: number) => void;
};

export type LocaleDateTime = {
  date: string;
  time: string;
  datetime: string;
  tooltip: string;
};
