import { useState } from "react";

import { useSession } from "../Session";
import themes from "./themes";
import type { DefaultTheme } from "./types";

const useThemeState = () => {
  const { themeName } = useSession();
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(
    themes[themeName] || themes.default
  );

  return { currentTheme, setCurrentTheme };
};

export default useThemeState;
