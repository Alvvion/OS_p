import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import useWindowTransitions from "@/components/system/Window/useWindowTransitions";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import type { ComponentProps } from "@/types/common";
import { loadFiles } from "@/utils/functions";

import { focusWindow, setZIndex, unFocusWindow } from "./functions";
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

  const zIndex = useMemo(
    () => stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1,
    [id, minimized, stackOrder]
  );

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
    if (webampCI) {
      if (
        foregroundId === id &&
        !containerRef?.current?.contains(document.activeElement)
      ) {
        focusWindow(webampCI, "main");
        containerRef?.current?.focus();
      }
      setZIndex(webampCI, zIndex);
    }
  }, [foregroundId, id, webampCI, zIndex]);

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
      className="absolute top-0 right-0 bottom-0 left-0"
      {...windowTranistion}
    />
  );
};

export default Webamp;
