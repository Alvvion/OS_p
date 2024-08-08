import type { MotionProps, Variant, Variants } from "framer-motion";
import { cubicBezier } from "framer-motion";

import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

export const staticBaseVariants: Variants = {
  active: { opacity: 1, scale: 1, height: "inherit", width: "inherit" },
  initial: { opacity: 0, scale: 0.75, height: "inherit", width: "inherit" },
};

export const staticMinimizeVariant: Variant = { opacity: 0, scale: 0.01 };

export const staticMaximizeVariant: Variant = {
  opacity: 1,
  scale: 1,
  width: "100vw",
};

export const animateTaskbar: MotionProps = {
  animate: "active",
  initial: "initial",
  exit: "initial",
  transition: {
    duration: DEFAULT_WINDOW_TRANSITION_DURATION / 1000,
    ease: cubicBezier(0.29, 0.5, 0.7, 1.3),
  },
};

export const buttonVariant: Variants = {
  active: { x: 0, y: 0 },
  initial: { x: 0, y: 50 },
};

export const notchVariant = (isNotch: boolean): Variants => ({
  active: { width: isNotch ? "0.375rem" : "1rem" },
  initial: { width: 0 },
});

export const animateStartMenu: MotionProps = {
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

export const animateWindowPeek: MotionProps = {
  animate: "active",
  initial: "initial",
  exit: "initial",
  transition: {
    duration: DEFAULT_WINDOW_TRANSITION_DURATION / 1000,
    ease: "easeInOut",
  },
  variants: {
    active: { opacity: 1 },
    initial: { opacity: 0 },
  },
};

export const animateContextMenu: MotionProps = {
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: {
    duration: DEFAULT_WINDOW_TRANSITION_DURATION / 1000,
  },
};
