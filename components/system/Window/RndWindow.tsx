import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import { defaultWindowSize } from "@/context/Context Factory/initialContextStates";
import { useSession } from "@/context/Session";
import { rndDefaults } from "@/utils/constants";

import type { RndWindowProps } from "./types";
import useRnd from "./useRnd";

const RndWindow: React.FC<RndWindowProps> = ({
  children,
  maximized,
  id,
  style,
}) => {
  const { height, width, updateSize, x, y, updatePosition, autoSizing } =
    useRnd(id, maximized);

  const rndRef = useRef<Rnd | null>(null);
  const { setWindowStates } = useSession();

  useEffect(() => {
    const { current } = rndRef || {};
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
    <Rnd
      disableDragging={maximized}
      size={{ height, width }}
      enableResizing={!maximized && !autoSizing}
      onResize={updateSize}
      style={style}
      position={{ x, y }}
      onDragStop={updatePosition}
      ref={rndRef}
      {...rndDefaults}
    >
      {children}
    </Rnd>
  );
};

export default RndWindow;
