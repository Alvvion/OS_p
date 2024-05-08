import { useMemo, useRef } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

import RndWindow from "./RndWindow";
import Titlebar from "./Titlebar";
import type { WindowComponentProps } from "./types";
import useFocusable from "./useFocusable";

const Window: React.FC<WindowComponentProps> = ({
  id,
  titlebarStyle,
  children,
}) => {
  const {
    processes: {
      [id]: { minimized, backgroundColor },
    },
  } = useProcesses();

  const { foregroundId } = useSession();

  const isForeground = useMemo(() => id === foregroundId, [foregroundId, id]);

  const {
    currentTheme: {
      sizes: {
        window: { boxShadow, outline, outlineInactive, boxShadowInactive },
      },
    },
  } = useTheme();

  const windowRef = useRef<HTMLElement | null>(null);
  const { zIndex, ...focusableProps } = useFocusable(id, windowRef);

  return (
    <RndWindow id={id} style={{ zIndex }}>
      <section
        style={{
          backgroundColor,
          boxShadow: isForeground ? boxShadow : boxShadowInactive,
          outline: isForeground ? outline : outlineInactive,
          display: minimized ? "none" : "block",
        }}
        ref={windowRef}
        className="absolute w-full h-full overflow-hidden rounded-[5px]"
        {...focusableProps}
      >
        <Titlebar id={id} bar={titlebarStyle} />
        {children}
      </section>
    </RndWindow>
  );
};

export default Window;
