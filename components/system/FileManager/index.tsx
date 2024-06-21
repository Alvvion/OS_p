import { basename, extname, resolve } from "path";
import { useEffect } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useTheme } from "@/context/Theme";
import { MOUNTABLE_EXTENSIONS, SHORTCUT } from "@/utils/constants";

import useFolderContextMenu from "./ContextMenu/useFolderContextMenu";
import FileEntry from "./FileEntry";
import type { FileManagerProps } from "./types";
import useFileDrop from "./useFileDrop";
import useFolder from "./useFolder";

const FileManager: React.FC<FileManagerProps> = ({ url, view = "default" }) => {
  const { files, updateFiles, fileActions, folderActions } = useFolder(url);
  const {
    currentTheme: {
      sizes: {
        taskbar: { height },
      },
    },
  } = useTheme();
  const { mountFs, unMountFs } = useFileSystem();

  useEffect(() => {
    const isMountable = MOUNTABLE_EXTENSIONS.has(extname(url));

    if (isMountable && files.length === 0) mountFs(url, updateFiles);

    return () => {
      if (isMountable && files.length > 0) unMountFs(url);
    };
  }, [url, files.length, mountFs, unMountFs, updateFiles]);

  return (
    <ol
      className="grid grid-flow-col gap-x-px gap-y-[10px] py-[5px] [main>&]:pb-5 [section_&]:grid-flow-row grid-cols-filemanager grid-rows-filemanager [nav_&]:grid-cols-startmenu"
      style={{
        height: `calc(100% - ${height})`,
      }}
      {...useFileDrop(url, updateFiles)}
      {...useFolderContextMenu(folderActions, updateFiles)}
    >
      {files.map((file) => (
        <FileEntry
          key={file}
          name={basename(file, SHORTCUT)}
          path={resolve(url, file)}
          fileActions={fileActions}
          view={view}
        />
      ))}
    </ol>
  );
};

export default FileManager;
