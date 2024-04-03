import { useCallback } from "react";
import { useTheme } from "styled-components";

import { useSession } from "@/contexts/session";

type WindowSize = {
  updateWindowSize: (height: number, width: number) => void;
};

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
          size: {
            height: height + Number(titlebar.height),
            width,
          },
        },
      })),
    [id, setWindowStates, titlebar.height]
  );

  return { updateWindowSize };
};

export default useWindowSize;
