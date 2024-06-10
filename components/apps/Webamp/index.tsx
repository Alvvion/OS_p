import { motion } from "framer-motion";
import { basename } from "path";
import { useEffect, useMemo, useRef } from "react";

import type { ComponentProps } from "@/components/common/types";
import useWindowTransitions from "@/components/system/Window/useWindowTransitions";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useFocusable from "@/hooks/useFocusable";
import { loadFiles } from "@/utils/functions";

import { focusWindow, unFocusWindow } from "./functions";
import useWebamp from "./useWebamp";

const Webamp: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { processes: { [id]: { url = "" } = {} } = {} } = useProcesses();

  const { fs } = useFileSystem();

  const windowTranistion = useWindowTransitions(id, containerRef);

  const { loadWebamp, webampCI } = useWebamp(id);

  useEffect(() => {
    fs?.readFile(url, (_error, contents = Buffer.from("")) => {
      loadFiles([
        "/libs/webamp/webamp.bundle.min.js",
        "/libs/webamp/butterchurn.min.js",
        "/libs/webamp/butterchurnPresets.min.js",
      ]).then(() => {
        loadWebamp(containerRef?.current, basename(url), contents);
      });
    });
  }, [fs, loadWebamp, url]);

  const focusEvents = useMemo(
    () => ({
      onBlur: () => webampCI && unFocusWindow(webampCI),
      onFocus: () => webampCI && focusWindow(webampCI, "main"),
    }),
    [webampCI]
  );

  const { zIndex, ...focusProps } = useFocusable(id, containerRef, focusEvents);

  return (
    <motion.div
      ref={containerRef}
      className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none [&_div:first-child]:pointer-events-auto"
      style={{ zIndex }}
      {...windowTranistion}
      {...focusProps}
    />
  );
};

export default Webamp;
