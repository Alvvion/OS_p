export type WindowPeek = {
  hidePeek: () => void;
  PeekComponent?: React.ComponentType;
  peekEvents: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
};

export type PeekWindowProps = {
  id: string;
  isPeekVisible: boolean;
};
