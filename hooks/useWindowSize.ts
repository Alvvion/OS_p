import { stripUnit } from "polished";
import { useCallback } from "react";

import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

import type { WindowSize } from "./types";

const useWindowSize = (id: string): WindowSize => {
  const { setWindowStates } = useSession();
  const {
    currentTheme: {
      sizes: { titlebar },
    },
  } = useTheme();

  const updateWindowSize = useCallback(
    (height: number, width: number) =>
      setWindowStates((currentState) => ({
        ...currentState,
        [id]: {
          size: {
            height: height + Number(stripUnit(titlebar.height)),
            width,
          },
        },
      })),
    [id, setWindowStates, titlebar.height]
  );

  return { updateWindowSize };
};

export default useWindowSize;
