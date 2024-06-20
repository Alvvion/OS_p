import { basename, extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { loadFiles } from "@/utils/functions";

import type { RufflePlayer } from "./types";

const libs = ["/libs/ruffle/ruffle.js"];

const useRuffle = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>
): void => {
  const { appendFileToTitle } = useTitle(id);
  const { fs } = useFileSystem();
  const [player, setPlayer] = useState<RufflePlayer>();

  useEffect(() => {
    loadFiles(libs).then(() => {
      window.RufflePlayer.config = {
        backgroundColor: "#000000",
        letterbox: "on",
        polyfills: false,
      };
      setPlayer(window.RufflePlayer?.newest()?.createPlayer());
    });
  }, []);

  useEffect(() => {
    if (fs && player) {
      containerRef.current?.appendChild(player);

      fs.readFile(url, (error, contents = Buffer.from("")) => {
        if (!error) {
          player.load({ data: contents }).then(() => {
            appendFileToTitle(basename(url, extname(url)));
          });
        }
      });
    }

    return () => player?.remove();
  }, [appendFileToTitle, containerRef, fs, player, url]);
};

export default useRuffle;
