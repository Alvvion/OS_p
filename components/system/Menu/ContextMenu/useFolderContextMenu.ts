import type { FolderActions } from "@/components/system/FileManager/types";
import { useFileSystem } from "@/context/FileSystem";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";

import type { ContextMenu } from "../types";

const useFolderContextMenu = (
  url: string,
  { addToFolder, newPath, pasteToFolder }: FolderActions,
): ContextMenu => {
  const { contextMenu } = useMenu();
  const { pasteList, updateFolder } = useFileSystem();
  const menuItems: MenuItem[] = [
    { label: "Refresh", action: () => updateFolder(url) },
    { separator: true },
    { label: "Add file", action: () => addToFolder() },
    {
      disabled: Object.keys(pasteList).length === 0,
      label: "Paste",
      action: () => pasteToFolder(),
    },
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
