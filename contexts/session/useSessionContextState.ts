import { useEffect, useState } from "react";

import type {
  SessionContextType,
  WindowStates,
} from "@/types/contexts/sessions";

import { useFileSystem } from "../fileSystem";

const SESSION_FILE = "/session.json";

const useSessionContextState = (): SessionContextType => {
  const [themeName, setThemeName] = useState<string>("");
  const [windowStates, setWindowStates] = useState<WindowStates>({});
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  const [foregroundId, setForegroundId] = useState("");
  const [stackOrder, setStackOrder] = useState<string[]>([]);

  const { fs } = useFileSystem();

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
        const session = JSON.parse(content.toString());
        setThemeName(session.themeName);
        setWindowStates(session.windowStates);
        setForegroundId(session.foregroundId);
        setStackOrder(session.stackOrder);
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
    setStackOrder,
  };
};

export default useSessionContextState;
