import type { Position } from "react-rnd";

export type DragZoom = {
  dragZoomProps: {
    draggable: boolean;
    onMouseDown: React.MouseEventHandler;
    onMouseMove?: React.MouseEventHandler;
    onMouseOut?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    style: React.CSSProperties;
  };
  isMaxZoom: boolean;
  isMinZoom: boolean;
  resetScale: () => void;
  zoom: (zoomDirection: "in" | "out" | "toggle") => void;
};

export type DragPositions = [start: Position, current: Position];

export type Fullscreen = {
  fullscreen: boolean;
  toggleFullscreen: () => void;
};
