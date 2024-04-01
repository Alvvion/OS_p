/* eslint-disable @next/next/no-img-element */
import { basename, extname, resolve } from "path";
import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
import { createPid } from "@/contexts/process/functions";
import { useSession } from "@/contexts/session";
import useDoubleClick from "@/hooks/useDoubleClick";
import useFileDrop from "@/hooks/useFileDrop";
import useFileInfo from "@/hooks/useFileInfo";
import useFiles from "@/hooks/useFiles";
import {
  StyledFileEntry,
  StyledFileManager,
} from "@/styles/components/system/StyledFileManager";
import type {
  FileEntryProps,
  FileManagerProps,
} from "@/types/components/system/FileManager";

const FileEntry: React.FC<FileEntryProps> = ({ name, path }) => {
  const { icon, pid, url } = useFileInfo(path);
  const { openProcess, processes } = useProcesses();
  const { setForegroundId } = useSession();
  const onActivate = useCallback(() => {
    const id = createPid(pid, url);
    if (processes[id]) {
      setForegroundId(id);
    } else {
      openProcess(pid, url);
    }
  }, [openProcess, pid, processes, setForegroundId, url]);

  return (
    <StyledFileEntry>
      <button type="button" onClick={useDoubleClick(onActivate)}>
        <figure>
          <img src={icon} alt={name} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </StyledFileEntry>
  );
};

const FileManager: React.FC<FileManagerProps> = ({ directory }) => {
  const { files, updateFiles } = useFiles(directory);
  return (
    <StyledFileManager {...useFileDrop(directory, updateFiles)}>
      {files.map((file) => (
        <FileEntry
          key={file}
          name={basename(file, extname(file))}
          path={resolve(directory, file)}
        />
      ))}
    </StyledFileManager>
  );
};
export default FileManager;
