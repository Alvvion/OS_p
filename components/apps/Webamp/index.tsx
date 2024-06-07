import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import type { ComponentProps } from "@/components/common/types";
import useWindowTransitions from "@/components/system/Window/useWindowTransitions";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { loadFiles } from "@/utils/functions";

import { focusWindow, unFocusWindow } from "./functions";
import useWebamp from "./useWebamp";

const Webamp: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    processes: {
      [id]: { minimized = false, url = "", taskbarEntry = undefined } = {},
    } = {},
  } = useProcesses();

  const { fs } = useFileSystem();

  const windowTranistion = useWindowTransitions(id, containerRef);

  const { loadWebamp, webampCI } = useWebamp(id);
  const { foregroundId, setForegroundId, stackOrder, prependToStack } =
    useSession();

  const zIndex =
    stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1;

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

  useEffect(() => containerRef?.current?.focus(), []);

  useEffect(() => {
    if (
      webampCI &&
      foregroundId === id &&
      !containerRef?.current?.contains(document.activeElement)
    ) {
      focusWindow(webampCI, "main");
      containerRef?.current?.focus();
    }
  }, [foregroundId, id, webampCI]);

  return (
    <motion.div
      ref={containerRef}
      tabIndex={-1}
      onFocus={() => {
        prependToStack(id);
        setForegroundId(id);
      }}
      onBlur={({ relatedTarget }) => {
        if (foregroundId === id && relatedTarget !== taskbarEntry)
          setForegroundId("");
        if (webampCI) unFocusWindow(webampCI);
      }}
      className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none [&_div:first-child]:pointer-events-auto"
      style={{ zIndex }}
      {...windowTranistion}
    />
  );
};

export default Webamp;
