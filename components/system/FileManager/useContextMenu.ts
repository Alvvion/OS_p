import type { MenuItem } from "@/context/Menu/types";
import { processDir } from "@/context/Process/directory";

import useFile from "./useFile";

const useContextMenu = (
  url: string,
  pid: string,
  deleteFile: () => void,
  renameFile: () => void
) => {
  const openFile = useFile(url, pid);
  const { icon: pidIcon } = processDir[pid] || {};

  const menuItems: MenuItem[] = [
    { label: "Delete", action: deleteFile },
    { label: "Rename", action: renameFile },
  ];

  if (pid) {
    menuItems.unshift(
      {
        icon: pidIcon,
        label: "Open",
        primary: true,
        action: openFile,
      },
      { separator: 1 }
    );
  }

  return menuItems;
};

export default useContextMenu;
