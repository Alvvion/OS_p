import { useState } from "react";

import type {
  SessionContextType,
  WindowStates,
} from "@/types/contexts/sessions";

const useSessionContextState = (): SessionContextType => {
  const [themeName, setThemeName] = useState<string>("");
  const [windowStates, setWindowStates] = useState<WindowStates>({});

  return {
    themeName,
    setThemeName,
    windowStates,
    setWindowStates,
  };
};

export default useSessionContextState;
