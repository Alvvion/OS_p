import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import useFileContextMenu from "@/components/system/Menu/ContextMenu/useFileContextMenu";
import { useTheme } from "@/context/Theme";
import useDoubleClick from "@/hooks/useDoubleClick";

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
  const { onClick } = useDoubleClick(() => openFile(pid), singleClick);

  const extraStyles = `border-2 border-transparent p-0 relative before:-bottom-px before:-left-px before:absolute before:-right-px before:-top-px ${backgroundFocused} before:border before:${borderFocused} hover:${backgroundFocusedHover} hover:before:border hover:before:${borderFocusedHover}`;

  return (
    <li
      className={
        view === "default"
          ? `flex justify-center h-min hover:border-2 hover:border-transparent hover:p-0 hover:relative hover:before:-bottom-px hover:before:-left-px hover:before:absolute hover:before:-right-px hover:before:-top-px hover:${background} hover:before:${border} hover:before:border z-[1] ${selected ? extraStyles : "p-0.5"}`
          : "hover:bg-[#313131] flex justify-center rounded-md"
      }
      {...focusEvents}
    >
      <Button
        type="button"
        extraStyles="relative"
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
              className={`[-webkit-box-orient:vertical] [display:-webkit-box] leading-[1.2] my-px mx-0 overflow-hidden py-0.5 px-px [word-break:break-word] ${selected ? "[-webkit-line-clamp:initial]" : "[-webkit-line-clamp:2]"} mt-[6px]`}
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
