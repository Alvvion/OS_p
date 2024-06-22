import type { FolderActions } from "@/components/system/FileManager/types";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";

const useFolderContextMenu = (
  { newPath }: FolderActions,
  updateFiles: (appendFile?: string) => void
) => {
  const { contextMenu } = useMenu();
  const menuItems: MenuItem[] = [
    { label: "Refresh", action: () => updateFiles() },
    { separator: 1 },
    {
      label: "New",
      menu: [
        { label: "New Folder", action: () => newPath("New Folder") },
        { separator: 2 },
        {
          label: "Text Document",
          action: () => newPath("New Text Document.txt", Buffer.from("")),
        },
      ],
    },
  ];

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useFolderContextMenu;
