import { stripUnit } from "polished";
import { useCallback, useEffect } from "react";
import { type CSSProperties, useTheme } from "styled-components";

import type { EventCallback, V86Starter } from "@/types/components/apps/V86";

import useWindowSize from "./useWindowSize";

const SET_SCREEN_GFX = "screen-set-size-graphical";
const SET_SCREEN_TXT = "screen-set-size-text";

const useV86ScreenSize = (
  emulator: V86Starter | null,
  id: string
): CSSProperties => {
  const {
    sizes: {
      window: { lineHeight },
    },
  } = useTheme();

  const { updateWindowSize } = useWindowSize(id);

  const setScreenGfx = useCallback<EventCallback>(
    ([width, height]) => updateWindowSize(height, width),
    [updateWindowSize]
  );

  const setScreenText = useCallback<EventCallback>(
    ([cols, rows]) => {
      updateWindowSize(
        rows * Number(stripUnit(lineHeight)),
        (cols / 2 + 4) * Number(stripUnit(lineHeight))
      );
    },
    [lineHeight, updateWindowSize]
  );

  useEffect(() => {
    emulator?.add_listener?.(SET_SCREEN_GFX, setScreenGfx);
    emulator?.add_listener(SET_SCREEN_TXT, setScreenText);

    return () => {
      emulator?.remove_listener?.(SET_SCREEN_GFX, setScreenGfx);
      emulator?.remove_listener?.(SET_SCREEN_GFX, setScreenGfx);
    };
  }, [emulator, setScreenGfx, setScreenText]);

  return {
    font: `${lineHeight} monospace`,
    lineHeight,
  };
};

export default useV86ScreenSize;
