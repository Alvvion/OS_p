import { useEffect, useState } from "react";

import type { Size } from "@/types/common";
import { DEFAULT_WINDOW_SIZE } from "@/utils/constants";

import type { StateSize } from "./types";

const useStateSize = (
  autoSizing = false,
  size = DEFAULT_WINDOW_SIZE
): StateSize => {
  const [{ height, width }, setSize] = useState<Size>(size);

  useEffect(() => {
    if (autoSizing) {
      setSize(size);
    }
  }, [autoSizing, size]);

  return [{ height, width }, setSize];
};

export default useStateSize;
