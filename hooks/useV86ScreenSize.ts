import { stripUnit } from "polished";
import { useCallback, useEffect } from "react";
import { type CSSProperties, useTheme } from "styled-components";

import { useSession } from "@/contexts/session";
import type { EventCallback, V86Starter } from "@/types/components/apps/V86";

const SET_SCREEN_GFX = "screen-set-size-graphical";
const SET_SCREEN_TXT = "screen-set-size-text";

const BORDER_OFFESET = 3;

const useV86ScreenSize = (
  emulator: V86Starter | null,
  id: string
): CSSProperties => {
  const { setWindowStates } = useSession();
  const {
    sizes: {
      titlebar,
      window: { lineHeight },
    },
  } = useTheme();

  const updateWindowSize = useCallback(
    (height: number, width: number) => {
      setWindowStates((current) => ({
        ...current,
        [id]: {
          size: { height, width },
        },
      }));
    },
    [id, setWindowStates]
  );

  const setScreenGfx = useCallback<EventCallback>(
    ([width, height]) =>
      updateWindowSize(height + Number(stripUnit(titlebar.height)), width),
    [titlebar.height, updateWindowSize]
  );

  const setScreenText = useCallback<EventCallback>(
    ([cols, rows]) => {
      updateWindowSize(
        rows * Number(stripUnit(lineHeight)) +
          Number(stripUnit(titlebar.height)) +
          BORDER_OFFESET,
        (cols / 2 + 4) * Number(stripUnit(lineHeight))
      );
    },
    [lineHeight, titlebar.height, updateWindowSize]
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
    top: BORDER_OFFESET - 1,
    position: "relative",
  };
};

export default useV86ScreenSize;
