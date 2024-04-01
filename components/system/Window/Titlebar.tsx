/* eslint-disable @next/next/no-img-element */
import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
import useWindowActions from "@/hooks/useWindowActions";
import {
  StyledTitlebar,
  StyledTitlebarButton,
} from "@/styles/components/system/StyledWindow";
import type { TitlebarProps } from "@/types/components/system/Window";

import { CloseIcon, MaximizedIcon, MaximizeIcon, MinimizeIcon } from "./Icons";

const Titlebar: React.FC<TitlebarProps> = ({ id, bar = "Default" }) => {
  const {
    processes: {
      [id]: { icon, title, autoSizing, maximized },
    },
  } = useProcesses();

  const { onMinimize, onMaximize, onClose } = useWindowActions(id);

  const titlebarType = useCallback(
    (barType: string) => {
      switch (barType) {
        case "Default":
          return (
            <h1>
              <figure>
                <img src={icon} alt={title} />
                <figcaption>{title}</figcaption>
              </figure>
            </h1>
          );
        default:
          return null;
      }
    },
    [icon, title]
  );

  return (
    <StyledTitlebar className="handle">
      {titlebarType(bar)}
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
    </StyledTitlebar>
  );
};

export default Titlebar;
