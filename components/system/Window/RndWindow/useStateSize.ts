import { useEffect, useState } from "react";

import type { Size } from "@/components/common/types";
import { useSession } from "@/context/Session";
import useDefaultSize from "@/hooks/useDefaultSize";

import type { StateSize } from "./types";

const useStateSize = (id: string, autoSizing = false): StateSize => {
  const defaultSize = useDefaultSize(id);
  const { windowStates: { [id]: { size = defaultSize } = {} } = {} } =
    useSession();
  const [{ height, width }, setSize] = useState<Size>(size);

  useEffect(() => {
    if (autoSizing) setSize(size);
  }, [autoSizing, size]);

  return [{ height, width }, setSize];
};

export default useStateSize;
