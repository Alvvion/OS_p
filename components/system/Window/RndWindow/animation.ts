import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

export const windowOpenCloseTransition = {
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0.05, scale: 0.8 },
  initial: { opacity: 0.05, scale: 0.8 },
  transition: { duration: DEFAULT_WINDOW_TRANSITION_DURATION / 1000 },
};

export const windowMinimizeMaximizeTransition = {};
