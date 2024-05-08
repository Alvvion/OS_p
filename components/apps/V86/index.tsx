import { useRef } from "react";

import { useProcesses } from "@/context/Process";
import type { ComponentProps } from "@/types/common";

import useV86 from "./useV86";
import useV86ScreenSize from "./useV86ScreenSize";

const V86: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: { [id]: { url = "" } = {} },
  } = useProcesses();
  const screenRef = useRef<HTMLDivElement | null>(null);
  const { emulator, lockMouse } = useV86(id, url, screenRef);

  const textStyle = useV86ScreenSize(emulator, id);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={screenRef} onClick={lockMouse}>
      <div style={textStyle} className="whitespace-pre" />
      <canvas style={{ height: "100% !important", width: "100% !important" }} />
    </div>
  );
};

export default V86;
