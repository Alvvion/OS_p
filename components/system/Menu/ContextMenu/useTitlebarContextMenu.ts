import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { useProcesses } from "@/context/Process";
import useWindowActions from "@/hooks/useWindowActions";
import { ICON_PATH } from "@/utils/constants";

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
      icon: `${ICON_PATH}restore${maximized ? "" : "_disabled"}.png`,
      action: () => onMaximize(),
    },
    {
      label: "Minimize",
      icon: `${ICON_PATH}minimize.png`,
      action: () => onMinimize(),
    },
    {
      label: "Maximize",
      disabled: maximized,
      icon: `${ICON_PATH}maximize${maximized ? "_disabled" : ""}.png`,
      action: () => onMaximize(),
    },
    { separator: true },
    {
      label: "Close",
      icon: `${ICON_PATH}close.png`,
      action: () => onClose(),
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useTitlebarContextMenu;
