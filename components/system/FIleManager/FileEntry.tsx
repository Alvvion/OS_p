import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
import { createPid } from "@/contexts/process/functions";
import { useSession } from "@/contexts/session";
import useDoubleClick from "@/hooks/useDoubleClick";
import useFileInfo from "@/hooks/useFileInfo";
import Image from "@/styles/commons/Image";
import { StyledFileEntry } from "@/styles/components/system/StyledFileManager";
import type { FileEntryProps } from "@/types/components/system/FileManager";

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

  return (
    <StyledFileEntry>
      <button type="button" onClick={useDoubleClick(onActivate)}>
        <figure>
          <Image src={icon} alt={name} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </StyledFileEntry>
  );
};

export default FileEntry;
