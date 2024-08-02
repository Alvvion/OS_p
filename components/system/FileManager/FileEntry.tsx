import { basename, extname } from "path";
import { useEffect, useRef } from "react";

import Icon from "@/components/common/Icon";
import useFileContextMenu from "@/components/system/Menu/ContextMenu/useFileContextMenu";
import { useFileSystem } from "@/context/FileSystem";
import type { ExtensionType } from "@/context/FileSystem/extensions";
import extensions from "@/context/FileSystem/extensions";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useDoubleClick from "@/hooks/useDoubleClick";
import {
  ICON_PATH,
  IMAGE_FILE_EXTENSION,
  PREVENT_SCROLL,
  SHORTCUT,
  VIDEO_FILE_EXTENSIONS,
} from "@/utils/constants";
import { getFormattedSize } from "@/utils/functions";

import { isSelectionIntersecting, truncateName } from "./functions";
import RenameBox from "./RenameBox";
import type { FileEntryProps } from "./types";
import useFile from "./useFile";
import useFileInfo from "./useFileInfo";

const _tailwind = [
  "hover:bg-file-background",
  "hover:before:border-file-border",
  "bg-file-backgroundFocused",
  "before:border-file-borderFocused",
  "hover:bg-file-backgroundFocusedHover",
  "hover:before:border-file-borderFocusedHover",
];

const FileEntry: React.FC<FileEntryProps> = ({
  fileActions,
  fileManagerRef,
  hideShortcutIcon,
  isDragging,
  isSelected,
  name,
  path,
  renaming,
  selectionRect,
  setRenaming,
  systemShortcut,
  stats,
  view,
  ...events
}) => {
  const { icon, pid, subIcons, url } = useFileInfo(path, stats.isDirectory());
  const { pasteList = {} } = useFileSystem();

  const { blurEntry, focusEntry, focusedEntries } = useSession();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const openFile = useFile(url);

  const fileName = basename(path);
  const urlExt = extname(url);
  const isDynamicIcon =
    IMAGE_FILE_EXTENSION.has(urlExt) || VIDEO_FILE_EXTENSIONS.has(urlExt);

  const filteredSubIcons =
    hideShortcutIcon || systemShortcut
      ? subIcons?.filter(
          (iconEntry) => iconEntry !== `${ICON_PATH}shortcut.png`,
        )
      : subIcons;

  const showFullName =
    focusedEntries.length === 1 && focusedEntries[0] === fileName;

  const {
    sizes: {
      fileEntry: { iconSize, fontSize, letterSpacing, maxTextDisplayLength },
    },
    colors: {
      fileEntry: {
        text,
        textShadow,
        background,
        border,
        backgroundFocused,
        borderFocused,
        backgroundFocusedHover,
        borderFocusedHover,
      },
    },
    formats,
  } = useTheme();

  const singleClick = view === "start";

  const { onClick } = useDoubleClick(
    () => openFile(pid, isDynamicIcon ? undefined : icon),
    singleClick,
  );

  const extraStyles = `border-2 border-transparent p-0 relative before:-bottom-px before:-left-px before:absolute before:-right-px before:-top-px ${isDragging ? "" : `${backgroundFocused} before:border before:${borderFocused} hover:${backgroundFocusedHover} hover:before:border hover:before:${borderFocusedHover}`}`;

  useEffect(() => {
    if (buttonRef.current) {
      const isFocused = focusedEntries.includes(fileName);

      if (selectionRect && fileManagerRef.current) {
        const selected = isSelectionIntersecting(
          buttonRef.current.getBoundingClientRect(),
          fileManagerRef.current.getBoundingClientRect(),
          selectionRect,
        );

        if (selected && !isFocused) {
          focusEntry(fileName);
          buttonRef.current.focus(PREVENT_SCROLL);
        } else if (!selected && isFocused) {
          blurEntry(fileName);
        }
      } else if (
        isFocused &&
        focusedEntries.length === 1 &&
        !buttonRef.current.contains(document.activeElement)
      ) {
        blurEntry();
        focusEntry(fileName);
        buttonRef.current.focus(PREVENT_SCROLL);
      }
    }
  }, [
    blurEntry,
    fileManagerRef,
    fileName,
    focusEntry,
    focusedEntries,
    selectionRect,
  ]);

  const createTooltip = (): string | undefined => {
    const extension = extname(path);
    const isShortcut = extension === SHORTCUT;

    if (isShortcut || stats.isDirectory()) return undefined;

    const type =
      extensions[extension as ExtensionType]?.type ||
      `${extension.toUpperCase().replace(".", "")} File`;
    const { atimeMs, ctimeMs, mtimeMs, size: sizeInBytes } = stats;
    const unknownTime = atimeMs === ctimeMs && ctimeMs === mtimeMs;
    const size = getFormattedSize(sizeInBytes);
    const toolTip = `Type: ${type}\nSize: ${size}`;

    if (unknownTime) return toolTip;

    const date = new Date(mtimeMs).toISOString().slice(0, 10);
    const time = new Intl.DateTimeFormat("en", formats.dateModified).format(
      mtimeMs,
    );
    const dateModified = `${date} ${time}`;

    return `${toolTip}\nDate modified: ${dateModified}`;
  };

  return (
    <li
      className={
        view === "default"
          ? `flex justify-center h-min hover:border-2 hover:border-transparent hover:p-0 hover:relative hover:before:-bottom-px hover:before:-left-px hover:before:absolute hover:before:-right-px hover:before:-top-px ${isDragging ? "" : `hover:${background} hover:before:${border} hover:before:border`} z-[1] ${isSelected ? extraStyles : "p-0.5"}`
          : "hover:bg-[#313131] flex justify-center rounded-md"
      }
      {...events}
    >
      <button
        type="button"
        ref={buttonRef}
        className="relative cursor-context-menu outline-none"
        onClick={onClick}
        title={createTooltip()}
        {...useFileContextMenu(url, pid, path, setRenaming, fileActions)}
      >
        <figure className="flex flex-col place-items-center mb-[-3px] relative">
          {[icon, ...(filteredSubIcons || [])].map((entryIcon) => (
            <Icon
              key={entryIcon}
              src={entryIcon}
              alt={name}
              size={view === "default" ? iconSize : "36px"}
              moving={icon === entryIcon && pasteList[path] === "move"}
              className="shortcut"
            />
          ))}
          {renaming ? (
            <RenameBox
              name={name}
              path={path}
              renameFile={(orgPath, newPath) => {
                fileActions.renameFile(orgPath, newPath);
                setRenaming("");
              }}
            />
          ) : (
            <figcaption
              style={{
                fontSize,
                color: text,
                letterSpacing,
                textShadow: view === "default" ? textShadow : "none",
              }}
              className="leading-[1.2] my-px mx-0 overflow-hidden py-0.5 px-px [word-break:break-word]"
            >
              {showFullName
                ? name
                : truncateName(
                    name,
                    fontSize,
                    formats.systemFont,
                    maxTextDisplayLength,
                  )}
            </figcaption>
          )}
        </figure>
      </button>
    </li>
  );
};

export default FileEntry;
