import { useProcesses } from "@/contexts/process";
import useWindowActions from "@/hooks/useWindowActions";
import { StyledTitlebarButton } from "@/styles/components/system/StyledTitlebar";

import { CloseIcon, MaximizedIcon, MaximizeIcon, MinimizeIcon } from "./Icons";

const WindowActionButton = ({ id }: { id: string }) => {
  const { onMinimize, onMaximize, onClose } = useWindowActions(id);
  const {
    processes: {
      [id]: { autoSizing, maximized },
    },
  } = useProcesses();
  return (
    <nav className="cancel">
      <StyledTitlebarButton type="button" onClick={onMinimize}>
        <MinimizeIcon />
      </StyledTitlebarButton>
      <StyledTitlebarButton
        type="button"
        onClick={onMaximize}
        disabled={autoSizing}
      >
        {maximized ? <MaximizedIcon /> : <MaximizeIcon />}
      </StyledTitlebarButton>
      <StyledTitlebarButton className="close" type="button" onClick={onClose}>
        <CloseIcon />
      </StyledTitlebarButton>
    </nav>
  );
};

export default WindowActionButton;
