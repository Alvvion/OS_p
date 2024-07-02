import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { useProcesses } from "@/context/Process";
import useWindowActions from "@/hooks/useWindowActions";

import type { ContextMenu } from "../types";

const useTitlebarContextMenu = (id: string): ContextMenu => {
  const { contextMenu } = useMenu();
  const { onClose, onMaximize, onMinimize } = useWindowActions(id);
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { maximized } = process || {};
  const menuItems: MenuItem[] = [
    {
      label: "Restore",
      disabled: !maximized,
      action: () => onMaximize(),
    },
    {
      label: "Minimize",
      action: () => onMinimize(),
    },
    {
      label: "Maximize",
      disabled: maximized,
      action: () => onMaximize(),
    },
    { separator: true },
    {
      label: "Close",
      action: () => onClose(),
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useTitlebarContextMenu;
