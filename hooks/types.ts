export type DoubleClickType = (
  handler: React.MouseEventHandler,
  singleClick?: boolean,
  timeout?: number,
) => React.MouseEventHandler;

export type WindowSize = {
  updateWindowSize: (height: number, width: number) => void;
};

export type LocaleDateTime = {
  date: string;
  time: string;
  datetime: string;
};

export type Events = {
  onBlurCapture: (event: React.FocusEvent<HTMLElement>) => void;
  onClickCapture: (event?: React.MouseEvent<HTMLElement>) => void;
  onFocusCapture: (event?: React.FocusEvent<HTMLElement>) => void;
};

export type Focusable = Events & {
  zIndex: number;
  tabIndex: number;
};

export type Title = {
  appendFileToTitle: (url: string) => void;
};

export type WindowActions = {
  onMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
};
