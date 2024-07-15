import { join } from "path";
import { useState } from "react";

import { useSession } from "@/context/Session";

import type { DraggableEntries, DraggableEntry } from "./types";

const useDraggableEntries = (): DraggableEntries => {
  const { blurEntry, focusEntry, focusedEntries } = useSession();

  const [dragging, setDragging] = useState(false);

  const onDragStart =
    (entryUrl: string, file: string): React.DragEventHandler =>
    (event) => {
      setDragging(true);
      blurEntry();
      focusEntry(file);
      event.dataTransfer.setData(
        "text/plain",
        focusedEntries.length <= 1
          ? join(entryUrl, file)
          : focusedEntries
              .map((entryFile) => join(entryUrl, entryFile))
              .toString(),
      );
      Object.assign(event.dataTransfer, { effectAllowed: "move" });
    };
  const onDragEnd = (): void => setDragging(false);

  return (entryUrl: string, file: string): DraggableEntry => ({
    draggable: true,
    isDragging: dragging,
    onDragStart: onDragStart(entryUrl, file),
    onDragEnd,
  });
};

export default useDraggableEntries;
