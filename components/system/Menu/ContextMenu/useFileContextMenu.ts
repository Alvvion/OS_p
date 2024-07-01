import { basename, dirname, extname } from "path";

import type { FileActions } from "@/components/system/FileManager/types";
import useFile from "@/components/system/FileManager/useFile";
import extensions from "@/context/FileSystem/extensions";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { useProcesses } from "@/context/Process";
import { processDir } from "@/context/Process/directory";
import { useSession } from "@/context/Session";
import { IMAGE_FILE_EXTENSION, SHORTCUT } from "@/utils/constants";

const useFileContextMenu = (
  url: string,
  pid: string,
  path: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  { deleteFile, downloadFile }: FileActions,
) => {
  const openFile = useFile(url);
  const { icon: pidIcon } = processDir[pid] || {};

  const { process: [, ...openWith] = [] } =
    extensions[extname(url || "")] || {};

  const filterdOpenWith = openWith.filter((id) => id !== pid);
  const { openProcess } = useProcesses();
  const { contextMenu } = useMenu();
  const { setWallpaper } = useSession();

  const menuItems: MenuItem[] = [
    { label: "Delete", action: () => deleteFile(path) },
    { label: "Rename", action: () => setState(basename(path)) },
  ];

  const extension = extname(path);
  const isShortcut = extension === SHORTCUT;

  if (!isShortcut && url && (extension || pid !== "FileExplorer")) {
    menuItems.unshift({ separator: true });

    menuItems.unshift({ label: "Download", action: () => downloadFile(path) });
  }

  if (IMAGE_FILE_EXTENSION.has(extension)) {
    menuItems.unshift({
      label: "Set as desktop background",
      menu: [
        {
          label: "Fill",
          action: () => setWallpaper(path, "fill"),
        },
        {
          label: "Fit",
          action: () => setWallpaper(path, "fit"),
        },
        {
          label: "Stretch",
          action: () => setWallpaper(path, "stretch"),
        },
        {
          label: "Tile",
          action: () => setWallpaper(path, "tile"),
        },
        {
          label: "Center",
          action: () => setWallpaper(path, "center"),
        },
      ],
    });
  }

  if (pid) {
    menuItems.unshift({ separator: true });

    if (filterdOpenWith.length > 0) {
      menuItems.unshift({
        label: "Open with",
        menu: filterdOpenWith.map((id): MenuItem => {
          const { icon, title: label } = processDir[id] || {};
          const action = () => openFile(id);

          return { icon, label, action };
        }),
      });
    }

    if (isShortcut && url && url !== "/") {
      const isFolder = extname(url) === "";
      menuItems.unshift({
        label: `Open ${isFolder ? "folder" : "file"} location`,
        action: () => openProcess("FileExplorer", dirname(url)),
      });
    }

    menuItems.unshift({
      icon: isShortcut || extname(url) ? pidIcon : undefined,
      label: "Open",
      primary: true,
      action: () => openFile(pid),
    });
  }

  return {
    onContextMenuCapture: contextMenu(menuItems),
  };
};

export default useFileContextMenu;
