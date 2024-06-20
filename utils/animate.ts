import { cubicBezier } from "framer-motion";

import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

export const staticBaseVariants = {
  active: { opacity: 1, scale: 1, height: "inherit", width: "inherit" },
  initial: { opacity: 0, scale: 0.75, height: "inherit", width: "inherit" },
};

export const staticMinimizeVariant = { opacity: 0, scale: 0.01 };

export const staticMaximizeVariant = {
  opacity: 1,
  scale: 1,
  width: "100vw",
};

export const animateTaskbar = {
  animate: "active",
  initial: "initial",
  exit: "initial",
  transition: {
    duration: DEFAULT_WINDOW_TRANSITION_DURATION / 1000,
    ease: cubicBezier(0.29, 0.5, 0.7, 1.3),
  },
};

export const buttonVariant = {
  active: { x: 0, y: 0 },
  initial: { x: 0, y: 50 },
};

export const notchVariant = (isNotch: boolean) => ({
  active: { width: isNotch ? "0.375rem" : "1rem" },
  initial: { width: 0 },
});

export const animateStartMenu = {
  animate: "active",
  initial: "initial",
  exit: "initial",
  transition: {
    duration: 0.4,
    ease: [-0.15, 1, 0, 1],
  },
  variants: {
    active: { height: "var(--height, 390px)", y: 0 },
    initial: { height: 0, y: 50 },
  },
};
