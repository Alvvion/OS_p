import { basename, dirname, extname, join } from "path";

import type { FileActions } from "@/components/system/FileManager/types";
import useFile from "@/components/system/FileManager/useFile";
import { useFileSystem } from "@/context/FileSystem";
import type { ExtensionType } from "@/context/FileSystem/extensions";
import extensions from "@/context/FileSystem/extensions";
import { getProcessByFileExtension } from "@/context/FileSystem/functions";
import { useMenu } from "@/context/Menu";
import type { MenuItem } from "@/context/Menu/types";
import { useProcesses } from "@/context/Process";
import { processDir } from "@/context/Process/directory";
import { useSession } from "@/context/Session";
import {
  IMAGE_FILE_EXTENSION,
  MOUNTABLE_EXTENSIONS,
  SHORTCUT,
} from "@/utils/constants";

import type { ContextMenu } from "../types";

const useFileContextMenu = (
  url: string,
  pid: string,
  path: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  {
    archiveFiles,
    deleteFile,
    downloadFiles,
    extractFiles,
    newShortcut,
  }: FileActions,
): ContextMenu => {
  const openFile = useFile(url);
  const { icon: pidIcon } = processDir[pid] || {};
  const urlExtension = extname(url);
  const { process: [extensionProcess, ...openWith] = [] } =
    urlExtension in extensions ? extensions[urlExtension as ExtensionType] : {};

  const filterdOpenWith = openWith.filter((id) => id !== pid);
  const { openProcess } = useProcesses();
  const { contextMenu } = useMenu();
  const { blurEntry, focusEntry, focusedEntries, setWallpaper } = useSession();
  const { copyEntries, moveEntries } = useFileSystem();
  const baseName = basename(path);
  const isFocusedEntry = focusedEntries.includes(baseName);

  const absoluteEntries = (): string[] =>
    focusedEntries.length === 1 || !isFocusedEntry
      ? [path]
      : [
          ...new Set([
            path,
            ...focusedEntries.map((entry) => join(dirname(path), entry)),
          ]),
        ];

  const menuItems: MenuItem[] = [
    { label: "Cut", action: () => moveEntries(absoluteEntries()) },
    { label: "Copy", action: () => copyEntries(absoluteEntries()) },
    { separator: true },
  ];

  const pathExtension = extname(path);
  const isShortcut = pathExtension === SHORTCUT;

  const defaultProcess =
    extensionProcess || getProcessByFileExtension(urlExtension);

  if (defaultProcess || isShortcut || (!pathExtension && !urlExtension)) {
    menuItems.push({
      label: "Create shortcut",
      action: () =>
        absoluteEntries().forEach((entry) =>
          newShortcut(entry, defaultProcess || "FileExplorer"),
        ),
    });
  }

  menuItems.push(
    {
      label: "Delete",
      action: () => absoluteEntries().forEach((entry) => deleteFile(entry)),
    },
    { label: "Rename", action: () => setState(basename) },
  );

  if (url && (pathExtension || pid !== "FileExplorer")) {
    menuItems.unshift({ separator: true });

    if (MOUNTABLE_EXTENSIONS.has(pathExtension)) {
      menuItems.unshift({
        label: "Extract Here",
        action: () => extractFiles(path),
      });
    }

    menuItems.unshift(
      {
        label: "Add to archive...",
        action: () => archiveFiles(absoluteEntries()),
      },
      {
        label: "Download",
        action: () => downloadFiles(absoluteEntries()),
      },
    );
  }

  if (IMAGE_FILE_EXTENSION.has(pathExtension)) {
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

  menuItems.unshift({ separator: true });

  if (!pid && filterdOpenWith.length === 0) {
    filterdOpenWith.push("MonacoEditor");
  }

  if (filterdOpenWith.length > 0) {
    menuItems.unshift({
      label: "Open with",
      menu: filterdOpenWith.map((id): MenuItem => {
        const { icon, title: label } = processDir[id] || {};
        const action = (): void => openFile(id, icon);

        return { icon, label, action };
      }),
    });
  }
  if (pid) {
    if (isShortcut && url && url !== "/") {
      const isFolder = extname(url) === "";
      menuItems.unshift({
        label: `Open ${isFolder ? "folder" : "file"} location`,
        action: () => openProcess("FileExplorer", dirname(url), ""),
      });
    }

    menuItems.unshift({
      icon: pidIcon,
      label: "Open",
      primary: true,
      action: () => openFile(pid, pidIcon),
    });
  }

  return {
    onContextMenuCapture: (event) => {
      if (!isFocusedEntry) {
        blurEntry();
        focusEntry(baseName);
      }
      contextMenu?.(menuItems)(event);
    },
  };
};

export default useFileContextMenu;
