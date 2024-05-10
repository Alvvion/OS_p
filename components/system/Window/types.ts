export type ComponentProps = {
  id: string;
};

export type WindowComponentProps = ComponentProps & {
  titlebarStyle: "File Explorer" | "Default";
  children: React.ReactNode;
};

export type Focusable = {
  zIndex: number;
  tabIndex: number;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
};

export type Variant = {
  opacity: number;
  scale: number;
  width?: string | number;
  height?: string | number;
};

export type Variants = {
  active: Variant;
  initial: Variant;
};
