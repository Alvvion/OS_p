import { stripUnit } from "polished";
import { useEffect, useState } from "react";

import { useTheme } from "@/context/Theme";
import type { Size } from "@/types/common";
import { DEFAULT_WINDOW_SIZE } from "@/utils/constants";

import type { StateSize } from "./types";

const useStateSize = (
  maximized = false,
  autoSizing = false,
  size = DEFAULT_WINDOW_SIZE
): StateSize => {
  const [{ height, width }, setSize] = useState<Size>(size);

  const {
    currentTheme: {
      sizes: { taskbar },
    },
  } = useTheme();

  useEffect(() => {
    if (autoSizing) {
      setSize(size);
    }
  }, [autoSizing, size]);

  return [
    {
      height: maximized
        ? `${window.innerHeight - Number(stripUnit(taskbar.height))}px`
        : height,
      width: maximized ? "100%" : width,
    },
    setSize,
  ];
};

export default useStateSize;
