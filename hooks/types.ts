export type DoubleClickType = (
  handler: React.MouseEventHandler,
  singleClick?: boolean,
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

export type Events = {
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  onFocus: (event?: React.FocusEvent<HTMLElement>) => void;
};

export type Focusable = Events & {
  zIndex: number;
  tabIndex: number;
};
