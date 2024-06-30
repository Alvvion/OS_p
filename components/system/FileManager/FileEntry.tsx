import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import useFileContextMenu from "@/components/system/Menu/ContextMenu/useFileContextMenu";
import { useTheme } from "@/context/Theme";
import { doubleClick } from "@/utils/functions";

import RenameBox from "./RenameBox";
import type { FileEntryProps } from "./types";
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
  renaming,
  setRenaming,
  fileActions,
  view,
  selected,
  ...focusEvents
}) => {
  const { icon, pid, url } = useFileInfo(path);
  const openFile = useFile(url);
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

  const extraStyles = `focus-within:border-2 focus-within:border-transparent focus-within:p-0 focus-within:relative focus-within:before:-bottom-px focus-within:before:-left-px focus-within:before:absolute focus-within:before:-right-px focus-within:before:-top-px focus-within:${backgroundFocused} focus-within:before:border focus-within:before:${borderFocused} focus-within:hover:${backgroundFocusedHover} focus-within:hover:before:border focus-within:hover:before:${borderFocusedHover}`;

  return (
    <li
      className={
        view === "default"
          ? `flex justify-center h-min p-0.5 hover:border-2 hover:border-transparent hover:p-0 hover:relative hover:before:-bottom-px hover:before:-left-px hover:before:absolute hover:before:-right-px hover:before:-top-px hover:${background} hover:before:${border} hover:before:border z-[1] ${selected ? extraStyles : ""}`
          : "hover:bg-[#313131] flex justify-center rounded-md"
      }
      {...focusEvents}
    >
      <Button
        type="button"
        extraStyles="relative"
        onClick={doubleClick(() => openFile(pid), singleClick)}
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
              className="[-webkit-box-orient:vertical] [display:-webkit-box] [-webkit-line-clamp:2] leading-[1.2] my-px mx-0 overflow-hidden py-0.5 px-px [word-break:break-word] focus-within:[-webkit-line-clamp:initial] mt-[6px]"
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
