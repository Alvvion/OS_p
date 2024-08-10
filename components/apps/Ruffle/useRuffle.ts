import { basename, extname } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
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
  const { readFile } = useFileSystem();
  const [player, setPlayer] = useState<RufflePlayer>();

  const loadFlash = useCallback(async () => {
    await player?.load({ data: await readFile(url) });
    appendFileToTitle(basename(url, extname(url)));
  }, [appendFileToTitle, player, readFile, url]);

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
    if (containerRef.current && player && url) loadFlash();
  }, [containerRef, loadFlash, player, url]);
};

export default useRuffle;
