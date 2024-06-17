import { useEffect, useState } from "react";

import type { Size } from "@/components/common/types";
import { useSession } from "@/context/Session";
import { DEFAULT_WINDOW_SIZE } from "@/utils/constants";

import type { StateSize } from "./types";

const useStateSize = (id: string, autoSizing = false): StateSize => {
  const { windowStates: { [id]: { size = DEFAULT_WINDOW_SIZE } = {} } = {} } =
    useSession();
  const [{ height, width }, setSize] = useState<Size>(size);

  useEffect(() => {
    if (autoSizing) setSize(size);
  }, [autoSizing, size]);

  return [{ height, width }, setSize];
};

export default useStateSize;
