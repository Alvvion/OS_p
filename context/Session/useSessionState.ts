import { dirname, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "../FileSystem";
import type {
  SessionContextType,
  UpdateFiles,
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
  const [startMenuVisible, setStartMenuVisible] = useState<boolean>(false);
  const [focusedEntries, setFocusedEntries] = useState<string[]>([]);
  const [wallpaperFit, setWallpaperFit] = useState<WallpaperFit>("fill");
  const [wallpaperImage, setWallpaperImage] = useState("");
  const [fsWatchers, setFsWatchers] = useState<Record<string, UpdateFiles[]>>(
    {},
  );

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

  const updateFolder = useCallback(
    (folder: string, newFile?: string, oldFile?: string): void => {
      const relevantPaths = Object.keys(fsWatchers).filter(
        (watchedFolder) =>
          watchedFolder === folder ||
          watchedFolder === dirname(folder) ||
          watchedFolder.startsWith(join(folder, "/")),
      );

      relevantPaths.forEach((watchedFolder) =>
        fsWatchers[watchedFolder].forEach((updateFiles) =>
          updateFiles(newFile, oldFile),
        ),
      );
    },

    [fsWatchers],
  );
  const addFsWatcher = useCallback(
    (folder: string, updateFiles: UpdateFiles): void =>
      setFsWatchers((currentFsWatcher) => ({
        ...currentFsWatcher,
        [folder]: [...(currentFsWatcher?.[folder] || []), updateFiles],
      })),
    [],
  );
  const removeFsWatcher = useCallback(
    (folder: string, updateFiles: UpdateFiles): void =>
      setFsWatchers((currentFsWatcher) => ({
        ...currentFsWatcher,
        [folder]: currentFsWatcher?.[folder]?.filter(
          (updateFilesInstance) => updateFilesInstance !== updateFiles,
        ),
      })),
    [],
  );

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
    addFsWatcher,
    blurEntry,
    focusEntry,
    focusedEntries,
    foregroundId,
    prependToStack,
    removeFromStack,
    removeFsWatcher,
    sessionLoaded,
    setForegroundId,
    setThemeName,
    setWallpaper,
    setWindowStates,
    stackOrder,
    startMenuVisible,
    themeName,
    toggleStartMenu,
    updateFolder,
    wallpaperImage,
    wallpaperFit,
    windowStates,
  };
};

export default useSessionContextState;
