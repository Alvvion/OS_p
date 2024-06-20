import { cubicBezier } from "framer-motion";

import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

export const config = {
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

export const notchVariant = {
  active: { width: "1rem" },
  initial: { width: 0 },
};
