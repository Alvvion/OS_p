import { extname } from "path";

import { extensions } from "@/context/FileSystem/functions";
import type { MenuItem } from "@/context/Menu/types";
import { processDir } from "@/context/Process/directory";

import useFile from "./useFile";

const useContextMenu = (
  url: string,
  pid: string,
  deleteFile: () => void,
  renameFile: () => void
) => {
  const openFile = useFile(url);
  const { icon: pidIcon } = processDir[pid] || {};

  const { process: [, ...openWith] = [] } = extensions[extname(url)] || {};

  const menuItems: MenuItem[] = [
    { label: "Delete", action: deleteFile },
    { label: "Rename", action: renameFile },
  ];

  if (pid) {
    menuItems.unshift({ separator: 1 });

    if (openWith.length) {
      menuItems.unshift({
        label: "Open with",
        menu: openWith.map((id): MenuItem => {
          const { icon, title: label } = processDir[id] || {};
          const action = () => openFile(id);

          return { icon, label, action };
        }),
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
