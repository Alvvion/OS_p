import { basename, extname, join } from "path";
import { useEffect, useRef, useState } from "react";

import NoPointersEvents from "@/components/common/NoPointersEvents";
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

const FileManager: React.FC<FileManagerProps> = ({
  closing,
  hideLoading,
  scrollable,
  url,
  view = "default",
}) => {
  const {
    sizes: {
      taskbar: { height },
      fileManager: {
        gridEntryWidth,
        gridEntryHeight,
        padding,
        rowGap,
        columnGap,
      },
    },
  } = useTheme();
  const { mountFs, unMountFs } = useFileSystem();
  const [renaming, setRenaming] = useState("");
  const fileManagerRef = useRef<HTMLOListElement | null>(null);

  const { files, fileActions, folderActions, isLoading, updateFiles } =
    useFolder(url, setRenaming);

  const focusableEntry = useFocusableEntries(fileManagerRef);
  const draggableEntry = useDraggableEntries();

  const { isSelecting, selectionRect, selectionStyling, selectionEvents } =
    useSelection(fileManagerRef);
  const fileDrop = useFileDrop(folderActions.newPath);
  const folderContextMenu = useFolderContextMenu(url, folderActions);

  useEffect(() => {
    const isMountable = MOUNTABLE_EXTENSIONS.has(extname(url));

    if (isMountable && Object.keys(files).length === 0) {
      mountFs(url).then(() => updateFiles());
    }

    return () => {
      if (isMountable && Object.keys(files).length > 0 && closing)
        unMountFs(url);
    };
  }, [url, files, mountFs, unMountFs, updateFiles, closing]);

  return !hideLoading && isLoading ? (
    <div className="cursor-wait w-full flex flex-col items-center justify-center text-xs pt-5 h-screen">
      <div className="text-white">Working on it...</div>
    </div>
  ) : (
    <ol
      ref={fileManagerRef}
      className={`grid grid-flow-col [main>&]:pb-5 [section_&]:grid-flow-row ${view === "default" && scrollable ? "custom-scrollbar" : ""}`}
      style={{
        height: `calc(100% - ${height})`,
        gridTemplateColumns: `repeat(auto-fill, ${gridEntryWidth})`,
        gridTemplateRows: `repeat(auto-fill, ${gridEntryHeight})`,
        padding,
        rowGap,
        columnGap,
        pointerEvents: isSelecting ? "auto" : undefined,
      }}
      {...selectionEvents}
      {...fileDrop}
      {...folderContextMenu}
    >
      {isSelecting && view === "default" && (
        <>
          <NoPointersEvents />
          <span
            className="bg-highlightBackground absolute z-[1000] border-highlight !pointer-events-auto"
            style={selectionStyling}
          />
        </>
      )}
      {Object.keys(files).map((file) => (
        <FileEntry
          key={file}
          name={basename(file, SHORTCUT)}
          path={join(url, file)}
          renaming={renaming === file}
          setRenaming={setRenaming}
          fileManagerRef={fileManagerRef}
          fileActions={fileActions}
          selectionRect={selectionRect}
          stats={files[file]}
          view={view}
          {...focusableEntry(file)}
          {...draggableEntry(url, file)}
        />
      ))}
    </ol>
  );
};

export default FileManager;
