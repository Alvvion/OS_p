import { basename } from "path";
import { useEffect, useRef } from "react";

import Icon from "@/components/common/Icon";
import useFileContextMenu from "@/components/system/Menu/ContextMenu/useFileContextMenu";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useDoubleClick from "@/hooks/useDoubleClick";

import { isSelectionIntersecting } from "./functions";
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
  isSelected,
  name,
  path,
  renaming,
  selecting,
  selectionRect,
  setRenaming,
  view,
  ...focusEvents
}) => {
  const { icon, pid, url } = useFileInfo(path);

  const { blurEntry, focusEntry, focusedEntries } = useSession();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const openFile = useFile(url);

  const fileName = basename(path);

  const {
    currentTheme: {
      sizes: {
        fileEntry: { iconSize, fontSize, letterSpacing },
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
    },
  } = useTheme();

  const singleClick = view === "start";

  const { onClick } = useDoubleClick(() => openFile(pid), singleClick);

  const extraStyles = `border-2 border-transparent p-0 relative before:-bottom-px before:-left-px before:absolute before:-right-px before:-top-px ${backgroundFocused} before:border before:${borderFocused} hover:${backgroundFocusedHover} hover:before:border hover:before:${borderFocusedHover}`;

  useEffect(() => {
    if (selectionRect && buttonRef.current && fileManagerRef.current) {
      const isFocused = focusedEntries.includes(fileName);
      const selected = isSelectionIntersecting(
        buttonRef.current.getBoundingClientRect(),
        fileManagerRef.current.getBoundingClientRect(),
        selectionRect,
      );

      if (selected && !isFocused) {
        focusEntry(fileName);
        buttonRef.current.focus();
      } else if (!selected && isFocused) {
        blurEntry(fileName);
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

  return (
    <li
      className={
        view === "default"
          ? `flex justify-center h-min hover:border-2 hover:border-transparent hover:p-0 hover:relative hover:before:-bottom-px hover:before:-left-px hover:before:absolute hover:before:-right-px hover:before:-top-px hover:${background} hover:before:${border} hover:before:border z-[1] ${isSelected ? extraStyles : "p-0.5"}`
          : "hover:bg-[#313131] flex justify-center rounded-md"
      }
      style={{
        pointerEvents: view === "default" && selecting ? "none" : "all",
      }}
      {...focusEvents}
    >
      <button
        type="button"
        ref={buttonRef}
        className="relative cursor-context-menu outline-none"
        onClick={onClick}
        {...useFileContextMenu(url, pid, path, setRenaming, fileActions)}
      >
        <figure className="flex flex-col place-items-center mb-[-3px]">
          <Icon
            src={icon}
            alt={name}
            size={view === "default" ? iconSize : "36px"}
          />
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
              className={`[-webkit-box-orient:vertical] [display:-webkit-box] leading-[1.2] my-px mx-0 overflow-hidden py-0.5 px-px [word-break:break-word] ${focusedEntries.length === 1 ? "[-webkit-line-clamp:initial]" : "[-webkit-line-clamp:2]"} mt-[6px]`}
            >
              {name}
            </figcaption>
          )}
        </figure>
      </button>
    </li>
  );
};

export default FileEntry;
