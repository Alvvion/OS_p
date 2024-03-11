import { useProcesses } from "@/contexts/process";
import { StyledWindow } from "@/styles/components/system/StyledWindow";
import type { WindowComponentProps } from "@/types/components/system/Window";

import RndWindow from "./RndWindow";
import Titlebar from "./Titlebar";

const Window: React.FC<WindowComponentProps> = ({ id, children }) => {
  const {
    processes: {
      [id]: { maximized, minimized, backgroundColor },
    },
  } = useProcesses();

  return (
    <RndWindow maximized={maximized} id={id}>
      <StyledWindow $minimized={minimized} style={{ backgroundColor }}>
        <Titlebar id={id} />
        {children}
      </StyledWindow>
    </RndWindow>
  );
};

export default Window;
