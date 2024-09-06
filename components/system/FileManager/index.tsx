import { basename, extname, join } from "path";
import { useEffect, useRef, useState } from "react";

import Loading from "@/components/common/Loading";
import NoPointersEvents from "@/components/common/NoPointersEvents";
import useFolderContextMenu from "@/components/system/Menu/ContextMenu/useFolderContextMenu";
import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { MOUNTABLE_EXTENSIONS, SHORTCUT } from "@/utils/constants";

import FileEntry from "./FileEntry";
import StatusBar from "./StatusBar";
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
  isExplorerer,
  scrollable,
  showStatusBar,
  url,
  view = "default",
}) => {
  const {
    sizes: {
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
  const { focusedEntries } = useSession();
  const [renaming, setRenaming] = useState("");
  const [currentUrl, setCurrentUrl] = useState(url);
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
  }, [closing, mountFs, mounted, unMountFs, updateFiles, url]);

  useEffect(() => {
    if (url !== currentUrl) {
      folderActions.resetFiles();
      setCurrentUrl(url);
    }
  }, [currentUrl, folderActions, url]);

  return (!hideLoading && isLoading) || url !== currentUrl ? (
    <Loading />
  ) : (
    <>
      <ol
        ref={fileManagerRef}
        className={
          view === "default"
            ? `grid ${isExplorerer ? "grid-flow-row items-stretch" : "pb-5 grid-flow-col h-full"} ${scrollable ? "custom-scrollbar" : "overflow-hidden"}`
            : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        }
        style={{
          height:
            view === "default" && isExplorerer
              ? "calc(100% - 65px)"
              : undefined,
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
      {showStatusBar && (
        <StatusBar
          count={Object.keys(files).length}
          directory={url}
          selected={focusedEntries}
        />
      )}
    </>
  );
};

export default FileManager;
