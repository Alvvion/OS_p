import { basename, extname } from "path";
import { useCallback, useEffect, useRef, useState } from "react";

import Button from "@/components/common/Button";
import {
  ExitFullscreen,
  Fullscreen,
  ZoomIn,
  ZoomOut,
} from "@/components/common/Icons";
import type { ComponentProps } from "@/components/common/types";
import useFileDrop from "@/components/system/FileManager/useFileDrop";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useDoubleClick from "@/hooks/useDoubleClick";
import useTitle from "@/hooks/useTitle";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { overrideSubMenuStyling } from "../MonacoEditor/functions";
import { panZoomConfig } from "./config";
import useFullscreen from "./useFullScreen";
import usePanZoom from "./usePanZoom";

const Photos: React.FC<ComponentProps> = ({ id }) => {
  const { processes: { [id]: process } = {} } = useProcesses();
  const { closing = false, url = "" } = process || {};
  const [src, setSrc] = useState<Record<string, string>>({});
  const { appendFileToTitle } = useTitle(id);
  const { readFile } = useFileSystem();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const { maxScale, minScale } = panZoomConfig;
  const { reset, scale, zoomIn, zoomOut, zoomToPoint } = usePanZoom(
    id,
    imageRef.current,
    imageContainerRef.current,
  );
  const { fullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const loadPhoto = useCallback(async () => {
    const fileContents = await readFile(url);

    setSrc((currentSrc) => {
      const [currentUrl] = Object.keys(currentSrc);

      if (currentUrl) {
        cleanUpBufferUrl(currentUrl);
        reset?.();
      }

      return { [url]: bufferToUrl(fileContents) };
    });
    appendFileToTitle(basename(url));
  }, [appendFileToTitle, readFile, reset, url]);

  useEffect(() => {
    if (url && !src[url] && !closing) loadPhoto();

    return () => cleanUpBufferUrl(src[url]);
  }, [closing, loadPhoto, src, url]);

  return (
    <div
      ref={containerRef}
      className="bg-[#222] flex pb-8 pt-12 relative"
      onBlur={overrideSubMenuStyling}
      style={{ height: "93%" }}
      {...useFileDrop({ id })}
    >
      <nav className="flex h-12 place-content-center place-items-center absolute top-0 w-full">
        <Button
          title="Zoom in"
          disabled={scale === maxScale}
          extraStyles="h-12 w-12 disabled:pointer-events-none hover:bg-[#4b4b4b80] active:bg-[#64646480]"
          onClick={zoomIn}
        >
          <ZoomIn
            extraStyles={`fill-white h-4 w-full ${scale === maxScale ? "bg-[#7D7D7D]" : ""}`}
          />
        </Button>
        <Button
          title="Zoom out"
          disabled={scale === minScale}
          extraStyles="h-12 w-12 disabled:pointer-events-none hover:bg-[#4b4b4b80] active:bg-[#64646480]"
          onClick={zoomOut}
        >
          <ZoomOut
            extraStyles={`h-4 w-full ${scale === minScale ? "fill-[#7D7D7D]" : "fill-white"}`}
          />
        </Button>
      </nav>
      <figure
        ref={imageContainerRef}
        className="flex h-full my-0 mr-8 ml-12 overflow-hidden place-content-center place-items-center w-full"
        {...useDoubleClick((event) => {
          if (scale === minScale) {
            zoomToPoint?.(minScale * 2, event, { animate: true });
          } else {
            reset?.();
          }
        })}
      >
        <img
          alt={basename(url, extname(url))}
          ref={imageRef}
          src={src[url]}
          style={{ visibility: src[url] ? "visible" : "hidden" }}
        />
      </figure>
      <nav className="flex h-12 place-content-center place-items-center absolute bottom-0 right-0">
        <Button
          title="Full-screen"
          extraStyles="h-12 w-12 disabled:pointer-events-none hover:bg-[#4b4b4b80] active:bg-[#64646480]"
          onClick={toggleFullscreen}
        >
          {fullscreen ? (
            <ExitFullscreen extraStyles="fill-white h-5 mt-0.5 w-full" />
          ) : (
            <Fullscreen extraStyles="fill-white h-5 mt-0.5 w-full" />
          )}
        </Button>
      </nav>
    </div>
  );
};

export default Photos;
