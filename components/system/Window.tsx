import { useProcesses } from "@/contexts/process";
import StyledWindow from "@/styles/components/system/StyledWindow";
import type { WindowComponentProps } from "@/types/components/system/Window";

const Window: React.FC<WindowComponentProps> = ({ id, children }) => {
  const {
    processes: {
      [id]: { minimized },
    },
  } = useProcesses();
  return <StyledWindow $minimized={minimized}>{children}</StyledWindow>;
};

export default Window;
