import type { MenuItem } from "@/context/Menu/types";
import { processDir } from "@/context/Process/directory";

import useFile from "./useFile";

const useContextMenu = (url: string, pid: string) => {
  const { openFile } = useFile(url, pid);
  const { icon: pidIcon } = processDir[pid] || {};

  const menuItems: MenuItem[] = [];

  if (pid) {
    menuItems.push({
      icon: pidIcon,
      label: "Open",
      primary: true,
      action: openFile,
    });
  } else {
    menuItems.push({ label: "Empty" });
  }

  return menuItems;
};

export default useContextMenu;
