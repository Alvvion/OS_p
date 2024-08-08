import { useCallback } from "react";

import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { pxToNumber } from "@/utils/functions";

import type { WindowSize } from "./types";

const useWindowSize = (id: string): WindowSize => {
  const { setWindowStates } = useSession();
  const {
    sizes: { titlebar },
  } = useTheme();

  const updateWindowSize = useCallback(
    (height: number, width: number) =>
      setWindowStates((currentState) => ({
        ...currentState,
        [id]: {
          position: currentState?.[id]?.position,
          size: {
            height: height + pxToNumber(titlebar.height),
            width,
          },
        },
      })),
    [id, setWindowStates, titlebar.height],
  );

  return { updateWindowSize };
};

export default useWindowSize;
