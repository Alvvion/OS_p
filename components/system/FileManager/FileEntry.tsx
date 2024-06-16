import { useState } from "react";

import { Button, Icon } from "@/components/common";
import { useMenu } from "@/context/Menu";
import { useTheme } from "@/context/Theme";
import useDoubleClick from "@/hooks/useDoubleClick";

import RenameBox from "./RenameBox";
import type { FileEntryProps } from "./types";
import useContextMenu from "./useContextMenu";
import useFile from "./useFile";
import useFileInfo from "./useFileInfo";

const _tailwind = [
  "hover:bg-file-background",
  "hover:before:border-file-border",
  "focus-within:bg-file-backgroundFocused",
  "focus-within:before:border-file-borderFocused",
  "focus-within:hover:bg-file-backgroundFocusedHover",
  "focus-within:hover:before:border-file-borderFocusedHover",
];

const FileEntry: React.FC<FileEntryProps> = ({
  name,
  path,
  deleteFile,
  renameFile,
  view,
}) => {
  const { icon, pid, url } = useFileInfo(path);
  const [renaming, setRenaming] = useState(false);
  const openFile = useFile(url);
  const menu = useContextMenu(
    url,
    pid,
    path,
    () => deleteFile(path),
    () => setRenaming(true)
  );
  const { contextMenu } = useMenu();
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

  const extraStyles = `hover:relative hover:before:absolute hover:before:-top-px hover:before:-bottom-px hover:before:-left-px hover:before:-right-px hover:${background} hover:before:${border} focus-within:${backgroundFocused} focus-within:before:${borderFocused} focus-within:hover:${backgroundFocusedHover}focus-within:hover:before:${borderFocusedHover}`;

  return (
    <li
      className={`flex justify-center p-[2px] overflow-hidden h-min border-2 border-transparent [&_figcaption]:focus-within:[-webkit-line-clamp:initial] focus-within:z-[1] ${extraStyles} [nav_&]:pb-5 [nav_&]:pt-2`}
    >
      <Button
        type="button"
        extraStyles="relative"
        onClick={useDoubleClick(() => openFile(pid), singleClick)}
        onContextMenu={contextMenu(menu)}
      >
        <figure className="flex flex-col items-center -mb-1">
          <Icon src={icon} alt={name} size={iconSize} />
          {renaming ? (
            <RenameBox
              name={name}
              path={path}
              renameFile={(orgPath, newPath) => {
                renameFile(orgPath, newPath);
                setRenaming(false);
              }}
            />
          ) : (
            <figcaption
              style={{ fontSize, color: text, letterSpacing, textShadow }}
              className="p-[3px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden break-words tracking-[-0.1px] leading-4 [nav_&]:![text-shadow:none]"
            >
              {name}
            </figcaption>
          )}
        </figure>
      </Button>
    </li>
  );
};

export default FileEntry;
