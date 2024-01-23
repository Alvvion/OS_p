export type ComponentProps = {
  id: string;
};

export type WindowComponentProps = ComponentProps & {
  children: React.ReactNode;
};

export type Size = {
  height: string;
  width: string;
};

export type Position = {
  x: number;
  y: number;
};

export type TitlebarProps = ComponentProps & {
  showBar?: boolean;
};
