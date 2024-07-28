import { join } from "path";
import { useState } from "react";

import { useSession } from "@/context/Session";

import type { DraggableEntries, DraggableEntry } from "./types";

const useDraggableEntries = (): DraggableEntries => {
  const [dragging, setDragging] = useState(false);
  const [dropIndex, setDropIndex] = useState(-1);
  const { blurEntry, focusEntry, focusedEntries, setSortOrders } = useSession();

  const onDragEnd =
    (entryUrl: string): React.DragEventHandler =>
    () => {
      setDragging(false);

      if (dropIndex !== -1) {
        setSortOrders((currentSortOrders) => {
          const sortedEntries = currentSortOrders[entryUrl].filter(
            (entry) => !focusedEntries.includes(entry),
          );

          sortedEntries.splice(dropIndex, 0, ...focusedEntries);

          return {
            ...currentSortOrders,
            [entryUrl]: sortedEntries,
          };
        });
      }
    };
  const onDragOver =
    (file: string): React.DragEventHandler =>
    ({ target }) => {
      if (target instanceof HTMLLIElement) {
        const { children = [] } = target.parentElement || {};
        const dragOverFocused = focusedEntries.includes(file);

        setDropIndex(dragOverFocused ? -1 : [...children].indexOf(target));
      }
    };

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

  return (entryUrl: string, file: string): DraggableEntry => ({
    draggable: true,
    isDragging: dragging,
    onDragStart: onDragStart(entryUrl, file),
    onDragEnd: onDragEnd(entryUrl),
    onDragOver: onDragOver(file),
  });
};

export default useDraggableEntries;
