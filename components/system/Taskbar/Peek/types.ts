export type WindowPeek = {
  PeekComponent?: React.ComponentType;
  peekEvents: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
};

export type PeekWindowProps = {
  id: string;
  image: string;
};
