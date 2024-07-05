import type { DraggableEventHandler } from "react-draggable";
import type { RndResizeCallback } from "react-rnd";

import type { ChildrenProp, Position, Size } from "@/components/common/types";
import type { rndDefaults } from "@/utils/constants";

export type RndWindowProps = ChildrenProp & {
  id: string;
  style: React.CSSProperties;
};

export type StatePosition = [
  Position,
  React.Dispatch<React.SetStateAction<Position>>,
];

export type StateSize = [Size, React.Dispatch<React.SetStateAction<Size>>];

export type RndHook = typeof rndDefaults & {
  disableDragging: boolean;
  enableResizing: boolean;
  lockAspectRatio: boolean;
  onDragStop: DraggableEventHandler;
  onResizeStop: RndResizeCallback;
  position: Position;
  size: Size;
};
