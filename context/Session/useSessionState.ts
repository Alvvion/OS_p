import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "../FileSystem";
import type {
  SessionContextType,
  SessionData,
  SortOrders,
  WallpaperFit,
  WindowStates,
} from "./types";

const SESSION_FILE = "/session.json";

const useSessionContextState = (): SessionContextType => {
  const [themeName, setThemeName] = useState<string>("");
  const [windowStates, setWindowStates] = useState<WindowStates>({});
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  const [foregroundId, setForegroundId] = useState("");
  const [stackOrder, setStackOrder] = useState<string[]>([]);
  const [focusedEntries, setFocusedEntries] = useState<string[]>([]);
  const [wallpaperFit, setWallpaperFit] = useState<WallpaperFit>("fill");
  const [wallpaperImage, setWallpaperImage] = useState("");
  const [sortOrders, setSortOrders] = useState<SortOrders>({});

  const { exists, readFile, writeFile } = useFileSystem();

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

  const initSession = useCallback(async () => {
    if (await exists(SESSION_FILE)) {
      const sessionData = await readFile(SESSION_FILE);
      const session = JSON.parse(sessionData.toString() || "{}") as SessionData;

      setSortOrders(session.sortOrders);
      setThemeName(session.themeName);
      setWallpaper(session.wallpaperImage, session.wallpaperFit);
      setWindowStates(session.windowStates);
    }

    setSessionLoaded(true);
  }, [exists, readFile]);

  useEffect(() => {
    if (sessionLoaded) {
      writeFile(
        SESSION_FILE,
        JSON.stringify({
          sortOrders,
          themeName,
          wallpaperFit,
          wallpaperImage,
          windowStates,
        }),
        true,
      );
    }
  }, [
    sessionLoaded,
    sortOrders,
    themeName,
    wallpaperFit,
    wallpaperImage,
    windowStates,
    writeFile,
  ]);

  useEffect(() => {
    initSession();
  }, [initSession]);

  return {
    blurEntry,
    focusEntry,
    focusedEntries,
    foregroundId,
    prependToStack,
    removeFromStack,
    sessionLoaded,
    setForegroundId,
    setSortOrders,
    setThemeName,
    setWallpaper,
    setWindowStates,
    sortOrders,
    stackOrder,
    themeName,
    wallpaperImage,
    wallpaperFit,
    windowStates,
  };
};

export default useSessionContextState;
