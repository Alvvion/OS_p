import { useCallback } from "react";

import { Button, Icon } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { createPid } from "@/context/Process/functions";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useDoubleClick from "@/hooks/useDoubleClick";

import type { FileEntryProps } from "./types";
import useFileInfo from "./useFileInfo";

const _tailwind = [
  "hover:bg-file-background",
  "hover:before:border-file-border",
  "focus-within:bg-file-backgroundFocused",
  "focus-within:before:border-file-borderFocused",
  "focus-within:hover:bg-file-backgroundFocusedHover",
  "focus-within:hover:before:border-file-borderFocusedHover",
];

const FileEntry: React.FC<FileEntryProps> = ({ name, path }) => {
  const { icon, pid, url } = useFileInfo(path);
  const { openProcess, processes, minimize } = useProcesses();
  const { setForegroundId } = useSession();
  const onActivate = useCallback(() => {
    const id = createPid(pid, url);
    if (processes[id]) {
      if (processes[id].minimized) minimize(id);
      setForegroundId(id);
    } else {
      openProcess(pid, url);
    }
  }, [minimize, openProcess, pid, processes, setForegroundId, url]);

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

  const extraStyles = `hover:relative hover:before:absolute hover:before:-top-px hover:before:-bottom-px hover:before:-left-px hover:before:-right-px hover:${background} hover:before:${border} focus-within:${backgroundFocused} focus-within:before:${borderFocused} focus-within:hover:${backgroundFocusedHover} focus-within:hover:before:${borderFocusedHover}`;

  return (
    <li
      className={`flex justify-center p-[2px] overflow-hidden h-min border-2 border-transparent [&_figcaption]:focus-within:[-webkit-line-clamp:initial] [&_figcaption]:focus-within:z-[1] ${extraStyles}`}
    >
      <Button
        type="button"
        extraStyles="relative"
        onClick={useDoubleClick(onActivate)}
      >
        <figure className="flex flex-col items-center">
          <Icon src={icon} alt={name} size={iconSize} />
          <figcaption
            style={{ fontSize, color: text, letterSpacing, textShadow }}
            className="py-[2px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden break-all"
          >
            {name}
          </figcaption>
        </figure>
      </Button>
    </li>
  );
};

export default FileEntry;
