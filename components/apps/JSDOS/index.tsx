import { useRef } from "react";

import type { ComponentProps } from "@/components/common/types";
import { useProcesses } from "@/context/Process";

import useJSDOS from "./useJSDOS";

const JSDOS: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: { [id]: { url = "" } = {} },
  } = useProcesses();
  const screenRef = useRef<HTMLDivElement | null>(null);

  useJSDOS(id, url, screenRef);

  return (
    <div
      className="bg-black w-full !h-full [&_canvas]:!top-0 [&_canvas]:w-full [&_div]:hidden [&_video]:hidden [&_canvas]:[image-rendering:pixelated] flex place-items-center"
      ref={screenRef}
    />
  );
};

export default JSDOS;
