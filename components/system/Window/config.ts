import type { Variant, Variants } from "./types";

export const staticBaseVariants: Variants = {
  active: { opacity: 1, scale: 1, height: "inherit", width: "inherit" },
  initial: { opacity: 0, scale: 0.75, height: "inherit", width: "inherit" },
};

export const staticMinimizeVariant: Variant = { opacity: 0, scale: 0 };

export const staticMaximizeVariant: Variant = {
  opacity: 1,
  scale: 1,
  width: "100vw",
};
