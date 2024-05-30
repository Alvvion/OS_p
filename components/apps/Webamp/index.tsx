import { useEffect, useRef } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import type { ComponentProps } from "@/types/common";
import { loadFiles } from "@/utils/functions";

import {
  focusWindow,
  getWebampElement,
  setZIndex,
  unFocusWindow,
} from "./functions";
import useWebamp from "./useWebamp";

const Webamp: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { processes: { [id]: { minimized = false, url = "" } = {} } = {} } =
    useProcesses();

  const { fs } = useFileSystem();

  const { loadWebamp, webampCI } = useWebamp(id);
  const { foregroundId, setForegroundId } = useSession();

  useEffect(() => {
    fs?.readFile(url, (_error, contents = Buffer.from("")) => {
      loadFiles([
        "/libs/webamp/webamp.bundle.min.js",
        "/libs/webamp/butterchurn.min.js",
        "/libs/webamp/butterchurnPresets.min.js",
      ]).then(() => {
        loadWebamp(containerRef?.current, contents);
      });
    });
  }, [fs, loadWebamp, url]);

  useEffect(() => {
    const webamp = getWebampElement();

    if (webamp) {
      webamp.style.display = minimized ? "none" : "block";
    }
  }, [minimized]);

  useEffect(() => containerRef?.current?.focus(), []);

  useEffect(() => {
    if (webampCI) {
      if (foregroundId === id) {
        if (!containerRef?.current?.contains(document.activeElement)) {
          focusWindow(webampCI, "main");
          containerRef?.current?.focus();
        }

        setZIndex(webampCI, 3);
      } else if (foregroundId) {
        setZIndex(webampCI, 1);
      }
    }
  }, [foregroundId, id, webampCI]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onFocus={() => setForegroundId(id)}
      onBlur={() => {
        setForegroundId("");
        if (webampCI) unFocusWindow(webampCI);
      }}
    />
  );
};

export default Webamp;
