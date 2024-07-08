import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import { reRouteFoucs } from "./functions";
import type { RndWindowProps } from "./types";
import useRnd from "./useRnd";

const RndWindow: React.FC<RndWindowProps> = ({ children, id, style }) => {
  const {
    processes: { [id]: process },
    linkElement,
  } = useProcesses();
  const { closing, maximized, componentWindow, minimized } = process || {};

  const rndProps = useRnd(id, maximized);

  const rndRef = useRef<Rnd | null>(null);
  const { setWindowStates } = useSession();

  useEffect(() => {
    const { current } = rndRef || {};

    const rndWindowElements =
      current?.resizableElement?.current?.children || [];

    const [windowContainer, resizeHandleContainer] =
      rndWindowElements as HTMLElement[];
    const resizeHandles = [...(resizeHandleContainer.children || [])];

    resizeHandles.forEach(reRouteFoucs(windowContainer));

    if (!componentWindow && windowContainer && process) {
      linkElement(id, "componentWindow", windowContainer);
    }

    return () => {
      if (closing) {
        setWindowStates((currentState) => ({
          ...currentState,
          [id]: {
            position: current?.props?.position,
            size: current?.props?.size,
          },
        }));
      }
    };
  }, [
    setWindowStates,
    id,
    maximized,
    componentWindow,
    linkElement,
    process,
    closing,
  ]);

  return (
    <Rnd
      style={{ ...style, pointerEvents: minimized ? "none" : undefined }}
      ref={rndRef}
      {...rndProps}
    >
      {children}
    </Rnd>
  );
};

export default RndWindow;
