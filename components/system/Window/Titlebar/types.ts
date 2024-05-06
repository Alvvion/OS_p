import type { ComponentProps } from "../types";

export type TitlebarProps = ComponentProps & {
  bar?: "File Explorer" | "Default";
};

export type IconProps = {
  extraStyles?: string;
};
