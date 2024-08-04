import { useEffect, useState } from "react";
import type videojs from "video.js";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";
import useWindowSize from "@/hooks/useWindowSize";
import {
  bufferToUrl,
  cleanUpBufferUrl,
  loadFiles,
  viewHeight,
  viewWidth,
} from "@/utils/functions";

import { config, getVideoType, libs, ytLib } from "./config";

const isYouTubeUrl = (url: string): boolean =>
  url.includes("youtube.com/") || url.includes("youtu.be/");

const useVideoPlayer = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
): void => {
  const { fs } = useFileSystem();
  const {
    processes: { [id]: { closing = false } = {} },
  } = useProcesses();
  const [player, setPlayer] = useState<ReturnType<typeof videojs>>();
  const { appendFileToTitle } = useTitle(id);
  const { updateWindowSize } = useWindowSize(id);

  useEffect(() => {
    const isYT = isYouTubeUrl(url);
    const loadPlayer = (src?: string): void => {
      const [videoElement] = containerRef.current
        ?.childNodes as NodeListOf<HTMLVideoElement>;
      if (player) {
        if (src && url) {
          player.src([
            {
              src,
              type: isYT ? "video/youtube" : getVideoType(url) || "video/mp4",
            },
          ]);
        }
        player.on("firstplay", () => {
          const [height, width] = [player.videoHeight(), player.videoWidth()];
          const [vh, vw] = [viewHeight(), viewWidth()];

          if (height > vh || width > vw) {
            updateWindowSize(vw * (height / width), vw);
          } else {
            updateWindowSize(height, width);
          }
        });
      } else if (window.videojs) {
        setPlayer(
          window.videojs(videoElement, {
            ...config,
            ...(isYT
              ? { techOrder: ["youtube"], youtube: { ytControls: 2 } }
              : { controls: true, inactivityTimeout: 0 }),
          }),
        );
      }

      if (!isYT) {
        appendFileToTitle(url);
        cleanUpBufferUrl(url);
      }
    };

    loadFiles(isYT ? [...libs, ytLib] : libs).then(() => {
      if (isYT) {
        loadPlayer(url);
      } else {
        fs?.readFile(url, (_error, contents = Buffer.from("")) =>
          loadPlayer(bufferToUrl(contents)),
        );
      }
    });
  }, [appendFileToTitle, containerRef, fs, player, updateWindowSize, url]);

  useEffect(
    () => () => {
      if (closing) player?.dispose();
    },
    [closing, player],
  );
};

export default useVideoPlayer;
