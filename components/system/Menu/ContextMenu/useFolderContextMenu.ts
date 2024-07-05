import type { FolderActions } from "@/components/system/FileManager/types";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { useSession } from "@/context/Session";

import type { ContextMenu } from "../types";

const useFolderContextMenu = (
  url: string,
  { newPath, addToFolder }: FolderActions,
): ContextMenu => {
  const { contextMenu } = useMenu();
  const { updateFolder } = useSession();
  const menuItems: MenuItem[] = [
    { label: "Refresh", action: () => updateFolder(url) },
    { separator: true },
    { label: "Add file", action: () => addToFolder() },
    { separator: true },

    {
      label: "New",
      menu: [
        {
          label: "New Folder",
          action: () => newPath("New Folder", undefined, true),
        },
        { separator: true },
        {
          label: "Text Document",
          action: () => newPath("New Text Document.txt", Buffer.from(""), true),
        },
      ],
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useFolderContextMenu;
