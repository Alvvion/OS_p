import { useState } from "react";

import { useSession } from "@/context/Session";

import type { DraggableEntries } from "./types";

const useDraggableEntries = (): DraggableEntries => {
  const { blurEntry, focusEntry, focusedEntries } = useSession();

  const [dragging, setDragging] = useState(false);

  const onDragStart = (file: string) => () => {
    setDragging(true);
    focusedEntries.forEach((focusedEntry) => blurEntry(focusedEntry));
    focusEntry(file);
  };

  const onDragEnd = () => setDragging(false);

  return (file: string) => ({
    draggable: true,
    isDragging: dragging,
    onDragStart: onDragStart(file),
    onDragEnd,
  });
};

export default useDraggableEntries;
