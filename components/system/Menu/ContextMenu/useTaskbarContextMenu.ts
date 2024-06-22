import { useMemo } from "react";

import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { useProcesses } from "@/context/Process";

const useTaskbarContextMenu = () => {
  const { contextMenu } = useMenu();
  const { minimize, processes } = useProcesses();
  const processArray = Object.entries(processes);
  const allWindowsMinimized = useMemo(
    () =>
      processArray.length > 0 &&
      !processArray.some(([, { minimized }]) => !minimized),
    [processArray]
  );
  const toggleDesktop = () =>
    processArray.forEach(
      ([pid, { minimized }]) =>
        (allWindowsMinimized || (!allWindowsMinimized && !minimized)) &&
        minimize(pid)
    );
  const menuItems: MenuItem[] = [
    {
      label: allWindowsMinimized ? "Show open windows" : "Show the desktop",
      action: toggleDesktop,
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useTaskbarContextMenu;
