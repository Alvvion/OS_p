import { motion } from "framer-motion";
import { basename, extname } from "path";
import { useEffect, useMemo, useRef, useState } from "react";

import type { ComponentProps } from "@/components/common/types";
import useWindowTransitions from "@/components/system/Window/useWindowTransitions";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useFocusable from "@/hooks/useFocusable";
import { bufferToUrl, loadFiles } from "@/utils/functions";

import {
  cleanBufferOnSkinLoad,
  focusWindow,
  parseTrack,
  unFocusWindow,
} from "./functions";
import useWebamp from "./useWebamp";

const WEBAMP_PATH = "/Program Files/Webamp";

const libs = [
  `${WEBAMP_PATH}/webamp.bundle.min.js`,
  `${WEBAMP_PATH}/butterchurn.min.js`,
  `${WEBAMP_PATH}/butterchurnPresets.min.js`,
];

const Webamp: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { processes: { [id]: { url = "" } = {} } = {} } = useProcesses();

  const { fs } = useFileSystem();

  const windowTranistion = useWindowTransitions(id);

  const { loadWebamp, webampCI } = useWebamp(id);
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    fs?.readFile(url, (_error, contents) => {
      loadFiles(libs).then(() => {
        loadWebamp(containerRef?.current, url, contents);
      });
    });
  }, [fs, loadWebamp, url]);

  useEffect(() => {
    if (url && url !== currentUrl && webampCI) {
      fs?.readFile(url, (_e, content = Buffer.from("")) => {
        if (extname(url) === ".mp3") {
          parseTrack(content, basename(url)).then((track) => {
            setCurrentUrl(url);
            webampCI.setTracksToPlay([track]);
          });
        } else {
          const bufferUrl = bufferToUrl(content);

          cleanBufferOnSkinLoad(webampCI, bufferUrl);
          webampCI.setSkinFromUrl(bufferUrl);
        }
      });
    }
  }, [currentUrl, fs, url, webampCI]);

  const focusEvents = useMemo(
    () => ({
      onBlurCapture: () => webampCI && unFocusWindow(webampCI),
      onFocusCapture: () => webampCI && focusWindow(webampCI, "main"),
    }),
    [webampCI],
  );

  const { zIndex, ...focusProps } = useFocusable(id, focusEvents);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none [&_div:first-child]:pointer-events-auto"
      style={{ zIndex }}
      {...windowTranistion}
      {...focusProps}
    />
  );
};

export default Webamp;
