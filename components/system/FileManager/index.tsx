import { basename, extname, join } from "path";
import { useEffect, useState } from "react";

import useFolderContextMenu from "@/components/system/Menu/ContextMenu/useFolderContextMenu";
import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { MOUNTABLE_EXTENSIONS, SHORTCUT } from "@/utils/constants";

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
  const { blurEntry, focusEntry, focusedEntries } = useSession();
  const [renaming, setRenaming] = useState("");

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
      {...useFileDrop(folderActions.newPath)}
      {...useFolderContextMenu(folderActions, updateFiles, setRenaming)}
    >
      {files.map((file) => (
        <FileEntry
          key={file}
          name={basename(file, SHORTCUT)}
          path={join(url, file)}
          renaming={renaming === file}
          setRenaming={setRenaming}
          fileActions={fileActions}
          view={view}
          onBlurCapture={() =>
            focusedEntries.forEach((focusedEntry) => blurEntry(focusedEntry))
          }
          onFocusCapture={() => focusEntry(file)}
          selected={focusedEntries.includes(file)}
        />
      ))}
    </ol>
  );
};

export default FileManager;
