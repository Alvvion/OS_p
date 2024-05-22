import { useEffect, useRef } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import type { ComponentProps } from "@/types/common";
import { loadFiles } from "@/utils/functions";

import { getWebampElement } from "./functions";
import useWebamp from "./useWebamp";

const Webamp: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { processes: { [id]: { minimized = false, url = "" } = {} } = {} } =
    useProcesses();

  const { fs } = useFileSystem();

  const { loadWebamp } = useWebamp(id);

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

  return <div ref={containerRef} />;
};

export default Webamp;
