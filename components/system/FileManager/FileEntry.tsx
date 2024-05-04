import { useCallback } from "react";

import { Button, Icon } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { createPid } from "@/context/Process/functions";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useDoubleClick from "@/hooks/useDoubleClick";

import type { FileEntryProps } from "./types";
import useFileInfo from "./useFileInfo";

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
        fileEntry: { text, textShadow },
      },
    },
  } = useTheme();

  return (
    <li className="flex justify-center p-[2px] overflow-hidden hover:bg-[#80808040] hover:border-solid hover:border-[2px] hover:border-[#80808040] hover:relative hover:p-0 hover:before:content-none hover:before:border hover:before:border-solid hover:before:border-[#B3B3B38C] hover:before:absolute hover:before:top-[-1px] hover:before:left-[-1px] hover:before:right-[-1px] hover:before:bottom-[-1px]">
      <Button
        type="button"
        extraStyles="relative"
        onClick={useDoubleClick(onActivate)}
      >
        <figure className="flex flex-col items-center">
          <Icon src={icon} alt={name} size={iconSize} />
          <figcaption
            style={{ fontSize, color: text, letterSpacing, textShadow }}
            className="py-[2px]"
          >
            {name}
          </figcaption>
        </figure>
      </Button>
    </li>
  );
};

export default FileEntry;
