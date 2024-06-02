import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "../FileSystem";
import type { SessionContextType, WindowStates } from "./types";

const SESSION_FILE = "/session.json";

const useSessionContextState = (): SessionContextType => {
  const [themeName, setThemeName] = useState<string>("");
  const [windowStates, setWindowStates] = useState<WindowStates>({});
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  const [foregroundId, setForegroundId] = useState("");
  const [stackOrder, setStackOrder] = useState<string[]>([]);
  const [startMenuVisible, setStartMenuVisible] = useState<boolean>(false);

  const { fs } = useFileSystem();

  const toggleStartMenu = useCallback(
    (showMenu?: boolean) =>
      setStartMenuVisible((current) => showMenu ?? !current),
    [setStartMenuVisible]
  );

  const prependToStack = useCallback(
    (id: string) =>
      setStackOrder((currentStackOrder) => [
        id,
        ...currentStackOrder.filter((stackId) => stackId !== id),
      ]),
    []
  );

  const removeFromStack = useCallback(
    (id: string) =>
      setStackOrder((currentStackOrder) =>
        currentStackOrder.filter((stackId) => stackId !== id)
      ),
    []
  );

  useEffect(() => {
    if (sessionLoaded) {
      fs?.writeFile(
        SESSION_FILE,
        JSON.stringify({
          themeName,
          windowStates,
          foregroundId,
          stackOrder,
        })
      );
    }
  }, [foregroundId, fs, sessionLoaded, stackOrder, themeName, windowStates]);

  useEffect(() => {
    fs?.readFile(SESSION_FILE, (_err, content) => {
      if (content) {
        const session = JSON.parse(content.toString() || "{}");
        setThemeName(session.themeName);
        setWindowStates(session.windowStates);
      }

      setSessionLoaded(true);
    });
  }, [fs]);

  return {
    themeName,
    setThemeName,
    windowStates,
    setWindowStates,
    foregroundId,
    setForegroundId,
    stackOrder,
    startMenuVisible,
    toggleStartMenu,
    prependToStack,
    removeFromStack,
  };
};

export default useSessionContextState;
