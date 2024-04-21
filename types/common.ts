import type { Props } from "react-rnd";

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
