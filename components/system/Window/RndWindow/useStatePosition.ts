import { useState } from "react";

import type { Position } from "@/types/common";
import { DEFAULT_WINDOW_POSITION } from "@/utils/constants";

import type { StatePosition } from "./types";

const useStatePosition = (
  maximized = false,
  position = DEFAULT_WINDOW_POSITION
): StatePosition => {
  const [{ x, y }, setPosition] = useState<Position>(position);

  return [{ x: maximized ? 0 : x, y: maximized ? 0 : y }, setPosition];
};

export default useStatePosition;
