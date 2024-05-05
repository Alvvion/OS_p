import { stripUnit } from "polished";
import { useCallback, useEffect, useState } from "react";

import { useTheme } from "@/context/Theme";
import useWindowSize from "@/hooks/useWindowSize";

import type { ModeCallback, SizeCallback, V86Starter } from "./types";

const SET_SCREEN_MODE = "screen-set-mode";
const SET_SCREEN_GFX = "screen-set-size-graphical";
const SET_SCREEN_TXT = "screen-set-size-text";

const useV86ScreenSize = (
  emulator: V86Starter | null,
  id: string
): React.CSSProperties => {
  const {
    currentTheme: {
      sizes: {
        window: { lineHeight },
      },
    },
  } = useTheme();

  const [isGraphical, setIsGraphical] = useState(false);

  const { updateWindowSize } = useWindowSize(id);

  const setScreenGfx = useCallback<SizeCallback>(
    ([width, height]) => updateWindowSize(height, width),
    [updateWindowSize]
  );

  const setScreenText = useCallback<SizeCallback>(
    ([cols, rows]) => {
      updateWindowSize(
        rows * Number(stripUnit(lineHeight)) + 3,
        (cols / 2 + 4) * Number(stripUnit(lineHeight))
      );
    },
    [lineHeight, updateWindowSize]
  );

  const setScreenMode = useCallback<ModeCallback>(
    (isGfxMode) => setIsGraphical(isGfxMode),
    []
  );

  useEffect(() => {
    emulator?.add_listener?.(SET_SCREEN_GFX, setScreenGfx);
    emulator?.add_listener(SET_SCREEN_TXT, setScreenText);
    emulator?.add_listener(SET_SCREEN_MODE, setScreenMode);

    return () => {
      emulator?.remove_listener?.(SET_SCREEN_GFX, setScreenGfx);
      emulator?.remove_listener?.(SET_SCREEN_GFX, setScreenGfx);
      emulator?.remove_listener?.(SET_SCREEN_MODE, setScreenMode);
    };
  }, [emulator, setScreenGfx, setScreenMode, setScreenText]);

  return {
    font: `${lineHeight} monospace`,
    lineHeight,
    position: "relative",
    top: isGraphical ? "" : "2px",
  };
};

export default useV86ScreenSize;
