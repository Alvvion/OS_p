import type { MotionProps, Variant } from "framer-motion";
import { stripUnit } from "polished";
import { useEffect, useState } from "react";

import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

import {
  staticBaseVariants,
  staticMaximizeVariant,
  staticMinimizeVariant,
} from "./config";

const useWindowTransitions = (
  id: string,
  ref: React.MutableRefObject<HTMLElement | null>
): MotionProps => {
  const {
    processes: {
      [id]: {
        maximized = false,
        minimized = false,
        taskbarEntry = undefined,
      } = {},
    },
  } = useProcesses();

  const { currentTheme: { sizes: { taskbar } = {} } = {} } = useTheme();

  const [maximize, setMaximize] = useState<Variant>({});
  const [minimize, setMinimize] = useState<Variant>({});

  useEffect(() => {
    const { x: windowX = 0, y: windowY = 0 } =
      ref?.current?.getBoundingClientRect() || {};

    setMaximize({
      ...staticMaximizeVariant,
      height: `${
        window.innerHeight - Number(stripUnit(taskbar?.height || 0))
      }px`,
      x: -windowX,
      y: -windowY,
    });
  }, [maximized, taskbar?.height, ref]);

  useEffect(() => {
    const {
      // height: taskbarHeight = 0,
      x: taskbarX = 0,
      y: taskbarY = 0,
    } = taskbarEntry?.getBoundingClientRect() || {};
    const {
      // height: windowHeight = 0,
      width: windowWidth = 0,
      x: windowX = 0,
      y: windowY = 0,
    } = ref?.current?.getBoundingClientRect() || {};

    setMinimize({
      ...staticMinimizeVariant,
      x: taskbarX - (windowX + windowWidth / 2),
      y: taskbarY - windowY,
    });
  }, [minimized, taskbarEntry, ref]);

  return {
    animate: (minimized && "minimize") || (maximized && "maximize") || "active",
    exit: "initial",
    initial: "initial",
    transition: {
      duration: DEFAULT_WINDOW_TRANSITION_DURATION / 1000,
    },
    variants: {
      ...staticBaseVariants,
      maximize,
      minimize,
    },
  };
};

export default useWindowTransitions;
