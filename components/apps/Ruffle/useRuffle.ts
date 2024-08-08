import { basename, extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { EMPTY_BUFFER } from "@/utils/constants";
import { loadFiles } from "@/utils/functions";

import type { RufflePlayer } from "./types";

const libs = ["/Program Files/Ruffle/ruffle.js"];

const useRuffle = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  const { appendFileToTitle } = useTitle(id);
  const { fs } = useFileSystem();
  const [player, setPlayer] = useState<RufflePlayer>();

  useEffect(() => {
    loadFiles(libs).then(() => {
      if (window.RufflePlayer) {
        window.RufflePlayer.config = {
          backgroundColor: "#000000",
          letterbox: "on",
          polyfills: false,
        };
        setPlayer(window.RufflePlayer.newest().createPlayer());
      }
    });
  }, []);

  useEffect(() => {
    if (containerRef.current && player) {
      containerRef.current.appendChild(player);
      setLoading(false);
    }

    return () => player?.remove();
  }, [containerRef, player, setLoading]);

  useEffect(() => {
    if (containerRef.current && player && url) {
      fs?.readFile(url, (error, contents = EMPTY_BUFFER) => {
        if (!error) {
          player.load({ data: contents }).then(() => {
            appendFileToTitle(basename(url, extname(url)));
          });
        }
      });
    }
  }, [appendFileToTitle, containerRef, fs, player, url]);
};

export default useRuffle;
