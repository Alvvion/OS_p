import type { PanzoomEventDetail, PanzoomObject } from "@panzoom/panzoom";

export type Fullscreen = {
  fullscreen: boolean;
  toggleFullscreen: () => void;
};

export type PanZoomEvent = Event & { detail: PanzoomEventDetail };

export type PanZoom = Partial<
  Pick<PanzoomObject, "reset" | "zoomIn" | "zoomOut" | "zoomToPoint">
> & { scale?: number };
