import { basename, extname, join } from "path";
import { useEffect, useRef, useState } from "react";

import useFolderContextMenu from "@/components/system/Menu/ContextMenu/useFolderContextMenu";
import { useFileSystem } from "@/context/FileSystem";
import { useTheme } from "@/context/Theme";
import { MOUNTABLE_EXTENSIONS, SHORTCUT } from "@/utils/constants";

import FileEntry from "./FileEntry";
import type { FileManagerProps } from "./types";
import useDraggableEntries from "./useDraggableEntries";
import useFileDrop from "./useFileDrop";
import useFocusableEntries from "./useFocusableEntries";
import useFolder from "./useFolder";
import useSelection from "./useSelection";

const FileManager: React.FC<FileManagerProps> = ({ url, view = "default" }) => {
  const {
    sizes: {
      taskbar: { height },
      fileManager: { gridEntryWidth, gridEntryHeight, padding, rowGap },
    },
  } = useTheme();
  const { mountFs, unMountFs } = useFileSystem();
  const [renaming, setRenaming] = useState("");
  const fileManagerRef = useRef<HTMLOListElement | null>(null);

  const { files, fileActions, folderActions } = useFolder(url, setRenaming);

  const focusableEntry = useFocusableEntries(fileManagerRef);
  const draggableEntry = useDraggableEntries(url);

  const { isSelecting, selectionRect, selectionStyling, selectionEvents } =
    useSelection(fileManagerRef);

  useEffect(() => {
    const isMountable = MOUNTABLE_EXTENSIONS.has(extname(url));

    if (isMountable && files.length === 0) mountFs(url);

    return () => {
      if (isMountable && files.length > 0) unMountFs(url);
    };
  }, [url, files.length, mountFs, unMountFs]);

  return (
    <ol
      ref={fileManagerRef}
      className="grid grid-flow-col [main>&]:pb-5 [section_&]:grid-flow-row"
      style={{
        height: `calc(100% - ${height})`,
        gridTemplateColumns: `repeat(auto-fill, ${gridEntryWidth})`,
        gridTemplateRows: `repeat(auto-fill, ${gridEntryHeight})`,
        padding,
        rowGap,
      }}
      {...selectionEvents}
      {...useFileDrop(folderActions.newPath)}
      {...useFolderContextMenu(url, folderActions)}
    >
      {isSelecting && view === "default" && (
        <span
          className="bg-highlightBackground absolute z-[1000] border-highlight"
          style={selectionStyling}
        />
      )}
      {files.map((file) => (
        <FileEntry
          key={file}
          name={basename(file, SHORTCUT)}
          path={join(url, file)}
          renaming={renaming === file}
          setRenaming={setRenaming}
          fileManagerRef={fileManagerRef}
          fileActions={fileActions}
          selecting={isSelecting}
          selectionRect={selectionRect}
          view={view}
          {...focusableEntry(file)}
          {...draggableEntry(url, file)}
        />
      ))}
    </ol>
  );
};

export default FileManager;
