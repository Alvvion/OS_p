import { basename, extname, join } from "path";
import { useEffect, useRef, useState } from "react";

import Loading from "@/components/common/Loading";
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
  id,
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
  const fileDrop = useFileDrop({ callback: folderActions.newPath });
  const folderContextMenu = useFolderContextMenu(url, folderActions);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (MOUNTABLE_EXTENSIONS.has(extname(url)) && !mounted) {
      setMounted((currentlyMounted) => {
        if (!currentlyMounted) mountFs(url).then(() => updateFiles());
        return true;
      });
    }
    return () => {
      if (mounted && closing) unMountFs(url);
    };
  }, [closing, mountFs, mounted, unMountFs, updateFiles, url]);

  return !hideLoading && isLoading ? (
    <Loading />
  ) : (
    <ol
      ref={fileManagerRef}
      className={
        view === "default"
          ? `grid grid-flow-col h-full [main>&]:pb-5 [section_&]:grid-flow-row ${scrollable ? "custom-scrollbar" : "overflow-hidden"}`
          : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      }
      style={{
        height: view === "default" ? `calc(100% - ${height})` : undefined,
        gridTemplateColumns:
          view === "default"
            ? `repeat(auto-fill, ${gridEntryWidth})`
            : undefined,
        gridTemplateRows:
          view === "default"
            ? `repeat(auto-fill, ${gridEntryHeight})`
            : undefined,
        padding: view === "default" ? padding : undefined,
        rowGap: view === "default" ? rowGap : undefined,
        columnGap: view === "default" ? columnGap : undefined,
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
          fileActions={fileActions}
          fileManagerId={id}
          fileManagerRef={fileManagerRef}
          hideShortcutIcon={view === "start"}
          key={file}
          name={basename(file, SHORTCUT)}
          path={join(url, file)}
          renaming={renaming === file}
          selectionRect={selectionRect}
          setRenaming={setRenaming}
          stats={files[file]}
          view={view}
          visible={!isLoading}
          {...focusableEntry(file)}
          {...(renaming !== file && draggableEntry(url, file))}
        />
      ))}
    </ol>
  );
};

export default FileManager;
