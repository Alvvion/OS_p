import type { Props } from "react-rnd";

export type ComponentProps = {
  id: string;
};

export type WindowComponentProps = ComponentProps & {
  children: React.ReactNode;
};

export type Size = NonNullable<Props["size"]>;

export type Position = {
  x: number;
  y: number;
};

export type TitlebarProps = ComponentProps & {
  bar?: "WinExplorer" | "Default";
};

export type WinExplorerTitlebarProps = {
  icon: string;
  title: string;
};

export type RndWindowProps = {
  children: React.ReactNode;
  maximized?: boolean;
  id: string;
};