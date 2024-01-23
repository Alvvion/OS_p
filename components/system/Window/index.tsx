import { Rnd } from "react-rnd";

import { useProcesses } from "@/contexts/process";
import useRnd from "@/hooks/useRnd";
import { StyledWindow } from "@/styles/components/system/StyledWindow";
import type { WindowComponentProps } from "@/types/components/system/Window";
import { rndDefaults } from "@/utils/constants";

import Titlebar from "./Titlebar";

const Window: React.FC<WindowComponentProps> = ({ id, children }) => {
  const {
    processes: {
      [id]: { maximized, minimized },
    },
  } = useProcesses();

  const { height, width, updateSize, x, y, updatePosition } = useRnd(maximized);

  return (
    <Rnd
      disableDragging={maximized}
      size={{ height, width }}
      enableResizing={!maximized}
      onResize={updateSize}
      style={{ backgroundColor: "red" }}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
    >
      <StyledWindow $minimized={minimized}>
        <Titlebar id={id} />
        {children}
      </StyledWindow>
    </Rnd>
  );
};

export default Window;
