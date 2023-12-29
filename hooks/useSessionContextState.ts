import { useState } from "react";

import { SessionContextType } from "@/types/contexts/sessions";

const useSessionContextState = (): SessionContextType => {
  const [themeName, setThemeName] = useState<string>("");

  return {
    themeName,
    setThemeName,
  };
};

export default useSessionContextState;
