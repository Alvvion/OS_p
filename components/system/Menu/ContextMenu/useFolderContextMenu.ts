import type { FolderActions } from "@/components/system/FileManager/types";
import { useFileSystem } from "@/context/FileSystem";
import { getIconByFileExtension } from "@/context/FileSystem/functions";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { EMPTY_BUFFER, ICON_PATH } from "@/utils/constants";

import type { ContextMenu } from "../types";
import { updateSortBy } from "./functions";

const useFolderContextMenu = (
  url: string,
  {
    addToFolder,
    newPath,
    pasteToFolder,
    sortByOrder: [[sortBy, isAscending], setSortBy],
  }: FolderActions,
): ContextMenu => {
  const { contextMenu } = useMenu();
  const { pasteList = {}, updateFolder } = useFileSystem();
  const menuItems: MenuItem[] = [
    {
      label: "Sort by",
      menu: [
        {
          label: "Name",
          action: () => setSortBy(updateSortBy("name", true)),
          toggle: sortBy === "name",
        },
        {
          label: "Size",
          action: () => setSortBy(updateSortBy("size", false)),
          toggle: sortBy === "size",
        },
        {
          label: "Item type",
          action: () => setSortBy(updateSortBy("type", true)),
          toggle: sortBy === "type",
        },
        {
          label: "Date modified",
          action: () => setSortBy(updateSortBy("date", false)),
          toggle: sortBy === "date",
        },
        { separator: true },
        {
          action: () => setSortBy(([value]) => [value, true]),
          label: "Ascending",
          toggle: isAscending,
        },
        {
          action: () => setSortBy(([value]) => [value, false]),
          label: "Descending",
          toggle: !isAscending,
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
          icon: `${ICON_PATH}folder.ico`,
        },
        { separator: true },
        {
          label: "Rich Text Document",
          action: () =>
            newPath("New Rich Text Document.whtml", EMPTY_BUFFER, true),
          icon: getIconByFileExtension(".whtml"),
        },
        {
          label: "Text Document",
          action: () => newPath("New Text Document.txt", EMPTY_BUFFER, true),
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
