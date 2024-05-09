import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import { defaultWindowSize } from "@/context/Context Factory/initialContextStates";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import { reRouteFoucs } from "./functions";
import type { RndWindowProps } from "./types";
import useRnd from "./useRnd";

const RndWindow: React.FC<RndWindowProps> = ({ children, id, style }) => {
  const {
    processes: { [id]: { autoSizing = false, maximized = false } = {} },
  } = useProcesses();

  const rndProps = useRnd(id, maximized);

  const rndRef = useRef<Rnd | null>(null);
  const { setWindowStates } = useSession();

  useEffect(() => {
    const { current } = rndRef || {};

    const [windowContainer, resizeHandleContainer] =
      current?.resizableElement?.current?.children || [];
    // eslint-disable-next-line no-unsafe-optional-chaining
    const resizeHandles = [...resizeHandleContainer?.children];

    resizeHandles.forEach(reRouteFoucs(windowContainer as HTMLElement));
    return () =>
      setWindowStates((currentState) => ({
        ...currentState,
        [id]: {
          position: current?.props?.position,
          size: autoSizing ? defaultWindowSize : current?.props?.size,
        },
      }));
  }, [setWindowStates, id, autoSizing]);

  return (
    <Rnd style={style} ref={rndRef} {...rndProps}>
      {children}
    </Rnd>
  );
};

export default RndWindow;
