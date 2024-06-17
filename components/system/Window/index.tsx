import { motion } from "framer-motion";

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
    processes: { [id]: { backgroundColor = "" } = {} },
  } = useProcesses();

  const { foregroundId } = useSession();

  const isForeground = id === foregroundId;

  const {
    currentTheme: {
      sizes: {
        window: { boxShadow, outline, outlineInactive, boxShadowInactive },
      },
    },
  } = useTheme();

  const { zIndex, ...focusableProps } = useFocusable(id);

  const windowTransition = useWindowTransitions(id);

  return (
    <RndWindow id={id} style={{ zIndex }}>
      <motion.section
        {...windowTransition}
        style={{
          backgroundColor,
          boxShadow: isForeground ? boxShadow : boxShadowInactive,
          outline: isForeground ? outline : outlineInactive,
        }}
        className="absolute w-full h-full overflow-hidden rounded-[5px]"
        {...focusableProps}
      >
        <Titlebar id={id} bar={titlebarStyle} />
        {children}
      </motion.section>
    </RndWindow>
  );
};

export default Window;
