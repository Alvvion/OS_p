import type { FolderActions } from "@/components/system/FileManager/types";
import { useFileSystem } from "@/context/FileSystem";
import { getIconByFileExtension } from "@/context/FileSystem/functions";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";

import type { ContextMenu } from "../types";

const useFolderContextMenu = (
  url: string,
  { addToFolder, newPath, pasteToFolder, setSortBy }: FolderActions,
): ContextMenu => {
  const { contextMenu } = useMenu();
  const { pasteList = {}, updateFolder } = useFileSystem();
  const menuItems: MenuItem[] = [
    {
      label: "Sort by",
      menu: [
        {
          label: "Name",
          action: () => setSortBy("name"),
        },
        {
          label: "Size",
          action: () => setSortBy("size"),
        },
        {
          label: "Item type",
          action: () => setSortBy("type"),
        },
        {
          label: "Date modified",
          action: () => setSortBy("date"),
        },
      ],
    },
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
          icon: "/System/Icons/ICON16772_1.ico",
        },
        { separator: true },
        {
          label: "Rich Text Document",
          action: () =>
            newPath("New Rich Text Document.whtml", Buffer.from(""), true),
          icon: getIconByFileExtension(".whtml"),
        },
        {
          label: "Text Document",
          action: () => newPath("New Text Document.txt", Buffer.from(""), true),
          icon: getIconByFileExtension(".txt"),
        },
      ],
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useFolderContextMenu;
