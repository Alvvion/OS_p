import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "../FileSystem";
import type { SessionContextType, WallpaperFit, WindowStates } from "./types";

const SESSION_FILE = "/session.json";

const useSessionContextState = (): SessionContextType => {
  const [themeName, setThemeName] = useState<string>("");
  const [windowStates, setWindowStates] = useState<WindowStates>({});
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  const [foregroundId, setForegroundId] = useState("");
  const [stackOrder, setStackOrder] = useState<string[]>([]);
  const [startMenuVisible, setStartMenuVisible] = useState<boolean>(false);
  const [focusedEntries, setFocusedEntries] = useState<string[]>([]);
  const [wallpaperFit, setWallpaperFit] = useState<WallpaperFit>("fill");
  const [wallpaperImage, setWallpaperImage] = useState("");

  const { fs } = useFileSystem();

  const toggleStartMenu = (showMenu?: boolean): void =>
    setStartMenuVisible((current) => showMenu ?? !current);

  const prependToStack = useCallback(
    (id: string) =>
      setStackOrder((currentStackOrder) => [
        id,
        ...currentStackOrder.filter((stackId) => stackId !== id),
      ]),
    [],
  );

  const removeFromStack = useCallback(
    (id: string) =>
      setStackOrder((currentStackOrder) =>
        currentStackOrder.filter((stackId) => stackId !== id),
      ),
    [],
  );

  const blurEntry = (entry?: string): void =>
    setFocusedEntries(
      entry
        ? (currentFocusedEntries) =>
            currentFocusedEntries.filter(
              (focusedEntry) => focusedEntry !== entry,
            )
        : [],
    );

  const focusEntry = (entry: string): void =>
    setFocusedEntries((currentFocusedEntries) => [
      ...currentFocusedEntries,
      entry,
    ]);

  const setWallpaper = (image: string, fit: WallpaperFit): void => {
    setWallpaperFit(fit);
    setWallpaperImage(image);
  };

  useEffect(() => {
    if (sessionLoaded) {
      fs?.writeFile(
        SESSION_FILE,
        JSON.stringify({
          foregroundId,
          stackOrder,
          themeName,
          wallpaperFit,
          wallpaperImage,
          windowStates,
        }),
      );
    }
  }, [
    foregroundId,
    fs,
    sessionLoaded,
    stackOrder,
    themeName,
    wallpaperFit,
    wallpaperImage,
    windowStates,
  ]);

  useEffect(() => {
    fs?.readFile(SESSION_FILE, (_err, content) => {
      if (content) {
        const session = JSON.parse(content.toString() || "{}");
        setThemeName(session.themeName);
        setWallpaper(session.wallpaperImage, session.wallpaperFit);
        setWindowStates(session.windowStates);
      }

      setSessionLoaded(true);
    });
  }, [fs]);

  return {
    blurEntry,
    focusEntry,
    focusedEntries,
    foregroundId,
    prependToStack,
    removeFromStack,
    sessionLoaded,
    setForegroundId,
    setThemeName,
    setWallpaper,
    setWindowStates,
    stackOrder,
    startMenuVisible,
    themeName,
    toggleStartMenu,
    wallpaperImage,
    wallpaperFit,
    windowStates,
  };
};

export default useSessionContextState;
