/* eslint-disable @next/next/no-img-element */
import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
import {
  StyledTitlebar,
  StyledTitlebarButton,
} from "@/styles/components/system/StyledWindow";
import type { ComponentProps } from "@/types/components/system/Window";

import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./Icons";

const Titlebar: React.FC<ComponentProps> = ({ id }) => {
  const {
    minimize,
    maximize,
    closeProcess,
    processes: {
      [id]: { icon, title },
    },
  } = useProcesses();

  const onMinimize = useCallback(() => minimize(id), [id, minimize]);
  const onMaximize = useCallback(() => maximize(id), [id, maximize]);
  const onClose = useCallback(() => closeProcess(id), [id, closeProcess]);

  return (
    <StyledTitlebar className="handle">
      <h1>
        <figure>
          <img src={icon} alt={title} />
          <figcaption>{title}</figcaption>
        </figure>
      </h1>
      <nav className="cancel">
        <StyledTitlebarButton type="button" onClick={onMinimize}>
          <MinimizeIcon />
        </StyledTitlebarButton>
        <StyledTitlebarButton type="button" onClick={onMaximize}>
          <MaximizeIcon />
        </StyledTitlebarButton>
        <StyledTitlebarButton type="button" onClick={onClose}>
          <CloseIcon />
        </StyledTitlebarButton>
      </nav>
    </StyledTitlebar>
  );
};

export default Titlebar;
