import type { ComponentProps } from "@/components/common/types";

export type TitlebarProps = ComponentProps & {
  bar?: "File Explorer" | "Default";
};
