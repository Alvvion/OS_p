import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";

import type { FolderActions } from "../types";

const useFolderContextMenu = (
  { newFile, newFolder }: FolderActions,
  updateFiles: (appendFile?: string) => void
) => {
  const { contextMenu } = useMenu();
  const menuItems: MenuItem[] = [
    { label: "Refresh", action: () => updateFiles() },
    { separator: 1 },
    {
      label: "New",
      menu: [
        { label: "New Folder", action: () => newFolder("New Folder") },
        { separator: 2 },
        {
          label: "Text Document",
          action: () => newFile("New Text Document.txt"),
        },
      ],
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useFolderContextMenu;
