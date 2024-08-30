import { motion } from "framer-motion";
import { basename, extname } from "path";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Options } from "webamp";

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

  const { readFile } = useFileSystem();

  const windowTranistion = useWindowTransitions(id);

  const { initWebamp, webampCI } = useWebamp(id);
  const [currentUrl, setCurrentUrl] = useState(url);

  const focusEvents = useMemo(
    () => ({
      onBlurCapture: () => webampCI && unFocusWindow(webampCI),
      onFocusCapture: () => webampCI && focusWindow(webampCI, "main"),
    }),
    [webampCI],
  );

  const { zIndex, ...focusProps } = useFocusable(id, focusEvents);

  const getUrlOptions = useCallback(async (): Promise<Options> => {
    if (url) {
      const extension = extname(url);

      if (extension === ".mp3") {
        return {
          initialTracks: [await parseTrack(await readFile(url), basename(url))],
        };
      }

      if (extension === ".wsz") {
        return { initialSkin: { url: bufferToUrl(await readFile(url)) } };
      }
    }

    return {};
  }, [readFile, url]);

  const loadWebampUrl = useCallback(async () => {
    if (webampCI) {
      const { initialTracks, initialSkin } = await getUrlOptions();

      if (initialTracks) webampCI.setTracksToPlay(initialTracks);
      else if (initialSkin) {
        cleanBufferOnSkinLoad(webampCI, initialSkin.url);
        webampCI.setSkinFromUrl(initialSkin.url);
      }
    }
  }, [getUrlOptions, webampCI]);

  useEffect(() => {
    if (containerRef.current && !webampCI) {
      loadFiles(libs).then(async () => {
        if (window.Webamp) {
          initWebamp(containerRef.current as HTMLDivElement,
            await getUrlOptions()
          );
        }
      });
    }
  }, [getUrlOptions, initWebamp, webampCI]);

  useEffect(() => {
    if (url !== currentUrl) {
      loadWebampUrl();
      setCurrentUrl(url);
    }
  }, [currentUrl, loadWebampUrl, url]);

  // useEffect(() => {
  //   fs?.readFile(url, (_error, contents) => {
  //     loadFiles(libs).then(() => {
  //       loadWebamp(containerRef?.current, url, contents);
  //     });
  //   });
  // }, [fs, loadWebamp, url]);

  // useEffect(() => {
  //   if (url && url !== currentUrl && webampCI) {
  //     fs?.readFile(url, (_e, content = EMPTY_BUFFER) => {
  //       if (extname(url) === ".mp3") {
  //         parseTrack(content, basename(url)).then((track) => {
  //           setCurrentUrl(url);
  //           webampCI.setTracksToPlay([track]);
  //         });
  //       } else {
  //         const bufferUrl = bufferToUrl(content);

  //         cleanBufferOnSkinLoad(webampCI, bufferUrl);
  //         webampCI.setSkinFromUrl(bufferUrl);
  //       }
  //     });
  //   }
  // }, [currentUrl, fs, url, webampCI]);

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
