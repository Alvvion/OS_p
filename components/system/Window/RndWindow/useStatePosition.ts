import { useState } from "react";

import type { Position } from "@/types/common";
import { DEFAULT_WINDOW_POSITION } from "@/utils/constants";

import type { StatePosition } from "./types";

const useStatePosition = (
  position = DEFAULT_WINDOW_POSITION
): StatePosition => {
  const [{ x, y }, setPosition] = useState<Position>(position);

  return [{ x, y }, setPosition];
};

export default useStatePosition;
