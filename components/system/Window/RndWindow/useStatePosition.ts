import { useState } from "react";

import type { Position, Size } from "@/components/common/types";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

import { centerPosition } from "./functions";
import type { StatePosition } from "./types";

const useStatePosition = (id: string, size: Size): StatePosition => {
  const {
    currentTheme: {
      sizes: {
        taskbar: { height: taskbarHeight },
      },
    },
  } = useTheme();

  const {
    windowStates: {
      [id]: { position = centerPosition(size, taskbarHeight) } = {},
    } = {},
  } = useSession();
  const [{ x, y }, setPosition] = useState<Position>(position);

  return [{ x, y }, setPosition];
};

export default useStatePosition;
