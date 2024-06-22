import type { Props } from "react-rnd";

export interface ImageProps extends React.ComponentPropsWithoutRef<"img"> {
  visibility?: boolean;
  size?: number | string;
  src?: string;
}
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  extraStyles?: string;
}

export type ChildrenProp = {
  children: React.ReactNode;
};

export type ComponentProps = {
  id: string;
};

export type Size = NonNullable<Props["size"]>;

export type Position = {
  x: number;
  y: number;
};

export type IconProps = {
  extraStyles?: string;
};

export type ContainerHook = (
  id: string,
  url: string,
  container: React.MutableRefObject<HTMLDivElement | null>,
) => void;

export interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  id: string;
  useHook: ContainerHook;
}
