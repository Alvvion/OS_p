import type { FolderActions } from "@/components/system/FileManager/types";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";

import type { ContextMenu } from "../types";

const useFolderContextMenu = (
  { newPath, addToFolder }: FolderActions,
  updateFiles: (appendFile?: string) => void,
  setRenaming: React.Dispatch<React.SetStateAction<string>>,
): ContextMenu => {
  const { contextMenu } = useMenu();
  const menuItems: MenuItem[] = [
    { label: "Refresh", action: () => updateFiles() },
    { separator: true },
    { label: "Add file", action: () => addToFolder() },
    { separator: true },

    {
      label: "New",
      menu: [
        {
          label: "New Folder",
          action: () => {
            newPath("New Folder");
            setRenaming("New Folder");
          },
        },
        { separator: true },
        {
          label: "Text Document",
          action: () => {
            newPath("New Text Document.txt", Buffer.from(""));
            setRenaming("New Text Document.txt");
          },
        },
      ],
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useFolderContextMenu;
