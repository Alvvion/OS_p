import { basename, extname, resolve } from "path";

import { useTheme } from "@/context/Theme";

import FileEntry from "./FileEntry";
import type { FileManagerProps } from "./types";
import useFileDrop from "./useFileDrop";
import useFiles from "./useFiles";

const FileManager: React.FC<FileManagerProps> = ({ directory }) => {
  const { files, updateFiles } = useFiles(directory);
  const {
    currentTheme: {
      sizes: {
        taskbar: { height },
      },
    },
  } = useTheme();
  return (
    <ol
      className="grid grid-flow-col gap-x-px gap-y-[10px] py-[5px]"
      style={{
        gridTemplateColumns: "repeat(auto-fill, 74px)",
        gridTemplateRows: "repeat(auto-fill, 85px)",
        height: `calc(100% - ${height})`,
      }}
      {...useFileDrop(directory, updateFiles)}
    >
      {files.map((file) => (
        <FileEntry
          key={file}
          name={basename(file, extname(file))}
          path={resolve(directory, file)}
        />
      ))}
    </ol>
  );
};

export default FileManager;