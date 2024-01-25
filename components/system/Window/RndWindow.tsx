import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import { useSession } from "@/contexts/sessions";
import useRnd from "@/hooks/useRnd";
import type { RndWindowProps } from "@/types/components/system/Window";
import { rndDefaults } from "@/utils/constants";
import { defaultWindowSize } from "@/utils/intialContextStates";

const RndWindow: React.FC<RndWindowProps> = ({ children, maximized, id }) => {
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
      style={{ zIndex: 2 }}
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
