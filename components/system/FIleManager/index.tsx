/* eslint-disable @next/next/no-img-element */
import { basename, extname, resolve } from "path";

import useFileDrop from "@/hooks/useFileDrop";
import useFiles from "@/hooks/useFiles";
import { StyledFileManager } from "@/styles/components/system/StyledFileManager";
import type { FileManagerProps } from "@/types/components/system/FileManager";

import FileEntry from "./FileEntry";

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
