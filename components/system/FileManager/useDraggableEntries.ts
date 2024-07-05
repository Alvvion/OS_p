import { join } from "path";
import { useState } from "react";

import { useSession } from "@/context/Session";

import type { DraggableEntries } from "./types";

const useDraggableEntries = (
  updateFiles: (appendFile?: string) => void,
): DraggableEntries => {
  const { blurEntry, focusEntry } = useSession();

  const [dragging, setDragging] = useState(false);

  const onDragStart =
    (url: string, file: string): React.DragEventHandler =>
    (event) => {
      setDragging(true);
      blurEntry();
      focusEntry(file);
      event.dataTransfer.setData("text/plain", join(url, file));
      Object.assign(event.dataTransfer, { effectAllowed: "move" });
    };
  const onDragEnd = (): void => {
    setDragging(false);
    updateFiles();
  };

  return (url: string, file: string) => ({
    draggable: true,
    isDragging: dragging,
    onDragStart: onDragStart(url, file),
    onDragEnd,
  });
};

export default useDraggableEntries;
