import Image from "next/image";
import { basename, extname, resolve } from "path";
import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
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
  const { icon, pid } = useFileInfo(path);
  const { openProcess } = useProcesses();
  const onActivate = useCallback(() => openProcess(pid), [openProcess, pid]);

  return (
    <StyledFileEntry>
      <button type="button" onClick={onActivate}>
        <figure>
          <Image src={icon} alt={name} width={20} height={20} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </StyledFileEntry>
  );
};

const FileManager: React.FC<FileManagerProps> = ({ directory }) => (
  <StyledFileManager>
    {useFiles(directory, (file) => (
      <FileEntry
        key={file}
        name={basename(file, extname(file))}
        path={resolve(directory, file)}
      />
    ))}
  </StyledFileManager>
);

export default FileManager;
