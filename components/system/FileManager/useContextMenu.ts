import { dirname, extname } from "path";

import { extensions } from "@/context/FileSystem/functions";
import type { MenuItem } from "@/context/Menu/types";
import { useProcesses } from "@/context/Process";
import { processDir } from "@/context/Process/directory";
import { SHORTCUT } from "@/utils/constants";

import useFile from "./useFile";

const useContextMenu = (
  url: string,
  pid: string,
  path: string,
  deleteFile: () => void,
  renameFile: () => void
) => {
  const openFile = useFile(url);
  const { icon: pidIcon } = processDir[pid] || {};

  const { process: [, ...openWith] = [] } =
    extensions[extname(url || "")] || {};

  const filterdOpenWith = openWith.filter((id) => id !== pid);
  const { openProcess } = useProcesses();

  const menuItems: MenuItem[] = [
    { label: "Delete", action: deleteFile },
    { label: "Rename", action: renameFile },
  ];

  if (pid) {
    const isShortcut = extname(path) === SHORTCUT && url && url !== "/";
    menuItems.unshift({ separator: 1 });

    if (filterdOpenWith.length) {
      menuItems.unshift({
        label: "Open with",
        menu: filterdOpenWith.map((id): MenuItem => {
          const { icon, title: label } = processDir[id] || {};
          const action = () => openFile(id);

          return { icon, label, action };
        }),
      });
    }

    if (isShortcut) {
      menuItems.unshift({
        label: "Open file location",
        action: () => openProcess("FileExplorer", dirname(url)),
      });
    }

    menuItems.unshift({
      icon: pidIcon,
      label: "Open",
      primary: true,
      action: () => openFile(pid),
    });
  }

  return menuItems;
};

export default useContextMenu;
