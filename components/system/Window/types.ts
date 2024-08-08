import type { ComponentProps } from "@/components/common/types";

export type WindowComponentProps = ComponentProps & {
  titlebarStyle: "File Explorer" | "Default";
  children: React.ReactNode;
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
