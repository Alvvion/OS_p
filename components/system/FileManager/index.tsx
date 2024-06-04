import { basename, extname, resolve } from "path";

import { useTheme } from "@/context/Theme";

import FileEntry from "./FileEntry";
import type { FileManagerProps } from "./types";
import useFileDrop from "./useFileDrop";
import useFiles from "./useFiles";

const FileManager: React.FC<FileManagerProps> = ({ directory }) => {
  const { files, updateFiles, deleteFile, renameFile } = useFiles(directory);
  const {
    currentTheme: {
      sizes: {
        taskbar: { height },
      },
    },
  } = useTheme();
  return (
    <ol
      className="grid grid-flow-col gap-x-px gap-y-[10px] py-[5px] [main>&]:pb-5 [section_&]:grid-flow-row grid-cols-filemanager grid-rows-filemanager [nav_&]:grid-cols-startmenu"
      style={{
        height: `calc(100% - ${height})`,
      }}
      {...useFileDrop(directory, updateFiles)}
    >
      {files.map((file) => (
        <FileEntry
          key={file}
          name={basename(file, extname(file))}
          path={resolve(directory, file)}
          deleteFile={deleteFile}
          renameFile={renameFile}
        />
      ))}
    </ol>
  );
};

export default FileManager;
