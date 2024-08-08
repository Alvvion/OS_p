import { useRef } from "react";

import { useProcesses } from "@/context/Process";
import type { ComponentProps } from "@/types/common";

import useJSDOS from "./useJSDOS";

const JSDOS: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: {
      [id]: { url = "" },
    },
  } = useProcesses();
  const screenRef = useRef<HTMLDivElement | null>(null);

  useJSDOS(id, url, screenRef);

  return (
    <div
      className="bg-black w-full h-full [&_canvas]:!top-0 [&_canvas]:h-full [&_canvas]:w-full [&_div]:hidden"
      ref={screenRef}
    />
  );
};

export default JSDOS;
