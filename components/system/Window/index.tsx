import { useRef } from "react";

import { useProcesses } from "@/context/Process";
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
      [id]: { maximized, minimized, backgroundColor },
    },
  } = useProcesses();

  const {
    currentTheme: {
      sizes: {
        window: { boxShadow, outline },
      },
    },
  } = useTheme();

  const windowRef = useRef<HTMLElement | null>(null);
  const { zIndex, ...focusableProps } = useFocusable(id, windowRef);

  return (
    <RndWindow maximized={maximized} id={id} style={{ zIndex }}>
      <section
        style={{
          backgroundColor,
          boxShadow,
          outline,
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
