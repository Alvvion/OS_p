import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useFocusable from "@/hooks/useFocusable";

import RndWindow from "./RndWindow";
import Titlebar from "./Titlebar";
import type { WindowComponentProps } from "./types";
import useWindowTransitions from "./useWindowTransitions";

const Window: React.FC<WindowComponentProps> = ({
  id,
  titlebarStyle,
  children,
}) => {
  const {
    linkElement,
    processes: { [id]: process },
  } = useProcesses();
  const { backgroundColor, peekElement } = process || {};

  const { foregroundId } = useSession();

  const isForeground = id === foregroundId;

  const {
    sizes: {
      window: { boxShadow, outline, outlineInactive, boxShadowInactive },
    },
  } = useTheme();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (process && viewportRef.current && !peekElement) {
      linkElement(id, "peekElement", viewportRef.current);
    }
  }, [id, linkElement, peekElement, process]);

  const { zIndex, ...focusableProps } = useFocusable(id);

  const windowTransition = useWindowTransitions(id);

  return (
    <RndWindow id={id} style={{ zIndex }}>
      <motion.section
        style={{
          backgroundColor,
          boxShadow: isForeground ? boxShadow : boxShadowInactive,
          outline: isForeground ? outline : outlineInactive,
        }}
        className="absolute w-full h-full overflow-hidden rounded-[5px] flex flex-col"
        onContextMenu={(event) => event.preventDefault()}
        {...windowTransition}
        {...focusableProps}
      >
        <Titlebar id={id} bar={titlebarStyle} />
        <div ref={viewportRef} className="bg-inherit h-full w-full">
          {children}
        </div>
      </motion.section>
    </RndWindow>
  );
};

export default Window;
