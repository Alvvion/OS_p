import { useRef } from "react";

import type { ComponentProps } from "@/components/common/types";
import { useTheme } from "@/context/Theme";

import useRuffle from "./useRuffle";

const Ruffle: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    currentTheme: {
      sizes: { titlebar },
    },
  } = useTheme();

  useRuffle(id, containerRef);

  return (
    <div
      style={{ height: `calc(100% - ${titlebar.height}) !important` }}
      className="[&_canvas]:h-full [&_canvas]:w-full"
      ref={containerRef}
    />
  );
};

export default Ruffle;
