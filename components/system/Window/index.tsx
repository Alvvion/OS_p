import { useRef } from "react";

import { useProcesses } from "@/contexts/process";
import useFocusable from "@/hooks/useFocusable";
import { StyledWindow } from "@/styles/components/system/StyledWindow";
import type { WindowComponentProps } from "@/types/components/system/Window";

import RndWindow from "./RndWindow";
import Titlebar from "./Titlebar";

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

  const windowRef = useRef<HTMLElement | null>(null);
  const { zIndex, ...focusableProps } = useFocusable(id, windowRef);

  return (
    <RndWindow maximized={maximized} id={id} style={{ zIndex }}>
      <StyledWindow
        $minimized={minimized}
        style={{ backgroundColor }}
        ref={windowRef}
        {...focusableProps}
      >
        <Titlebar id={id} bar={titlebarStyle} />
        {children}
      </StyledWindow>
    </RndWindow>
  );
};

export default Window;
