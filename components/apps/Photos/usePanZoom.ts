import Panzoom from "@panzoom/panzoom";
import { basename } from "path";
import { useCallback, useEffect, useState } from "react";

import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";

import { panZoomConfig } from "./config";
import type { PanZoom, PanZoomEvent } from "./types";

const usePanZoom = (
  id: string,
  imgElement: HTMLImageElement | null,
  containerElement: HTMLElement | null,
): PanZoom => {
  const [panZoom, setPanZoom] = useState<ReturnType<typeof Panzoom>>();
  const { getScale, reset, zoomIn, zoomOut, zoomToPoint, zoomWithWheel } =
    panZoom || {};
  const [resizeObserver, setResizeObserver] = useState<ResizeObserver>();
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { componentWindow, url = "" } = process || {};
  const { appendFileToTitle } = useTitle(id);
  const zoomUpdate = useCallback(
    (panZoomEvent: unknown) => {
      const { detail: { scale = 0, x = 0, y = 0 } = {} } =
        (panZoomEvent as PanZoomEvent) || {};

      if (scale) {
        const { minScale, step } = panZoomConfig;
        const isMinScale = scale < minScale + step;

        if (isMinScale && (x || y)) setTimeout(() => panZoom?.reset(), 50);

        appendFileToTitle(
          isMinScale
            ? basename(url)
            : `${basename(url)} (${Math.floor(scale * 100)}%)`,
        );
      }
    },
    [appendFileToTitle, panZoom, url],
  );

  useEffect(() => {
    if (!resizeObserver && reset) {
      setResizeObserver(new ResizeObserver(reset));
    }
  }, [reset, resizeObserver]);

  useEffect(() => {
    if (componentWindow instanceof HTMLElement) {
      resizeObserver?.observe(componentWindow);
    }

    return () => {
      if (componentWindow instanceof HTMLElement) {
        resizeObserver?.unobserve(componentWindow);
      }
    };
  }, [componentWindow, resizeObserver]);

  useEffect(() => {
    if (imgElement && containerElement && zoomWithWheel) {
      imgElement.addEventListener("panzoomchange", zoomUpdate);
      containerElement.addEventListener("wheel", (event) =>
        zoomWithWheel(event, { step: 0.3 }),
      );
    }
  }, [containerElement, imgElement, zoomUpdate, zoomWithWheel]);

  useEffect(() => {
    if (imgElement && !panZoom) {
      setPanZoom(Panzoom(imgElement, panZoomConfig));
    }
  }, [imgElement, panZoom, zoomUpdate]);

  return { reset, scale: getScale?.(), zoomIn, zoomOut, zoomToPoint };
};

export default usePanZoom;
