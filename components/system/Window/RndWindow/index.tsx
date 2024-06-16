import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import { useProcesses } from "@/context/Process";
import type { Process } from "@/context/Process/types";
import { useSession } from "@/context/Session";

import { reRouteFoucs } from "./functions";
import type { RndWindowProps } from "./types";
import useRnd from "./useRnd";

const RndWindow: React.FC<RndWindowProps> = ({ children, id, style }) => {
  const {
    processes: { [id]: windowProcess = {} },
    linkElement,
  } = useProcesses();
  const { maximized, componentWindow } = windowProcess as Process;

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

    if (
      !componentWindow &&
      windowContainer &&
      Object.keys(windowProcess).length
    ) {
      linkElement(id, "componentWindow", windowContainer as HTMLElement);
    }

    // console.log(componentWindow);
    return () =>
      setWindowStates((currentState) => ({
        ...currentState,
        [id]: {
          position: current?.props?.position,
          size: current?.props?.size,
        },
      }));
  }, [
    setWindowStates,
    id,
    maximized,
    componentWindow,
    windowProcess,
    linkElement,
  ]);

  return (
    <Rnd style={style} ref={rndRef} {...rndProps}>
      {children}
    </Rnd>
  );
};

export default RndWindow;
