import { basename, extname } from "path";
import { useEffect, useRef, useState } from "react";

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
import useDragZoom from "./useDragZoom";
import useFullscreen from "./useFullScreen";

const Photos: React.FC<ComponentProps> = ({ id }) => {
  const { processes: { [id]: process } = {} } = useProcesses();
  const { closing = false, url = "" } = process || {};
  const [src, setSrc] = useState<Record<string, string>>({});
  const { appendFileToTitle } = useTitle(id);
  const { fs } = useFileSystem();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const { dragZoomProps, isMaxZoom, isMinZoom, zoom } = useDragZoom(
    id,
    imageRef,
    imageContainerRef,
  );
  const { fullscreen, toggleFullscreen } = useFullscreen(containerRef);

  useEffect(() => {
    if (fs && url && !src[url] && !closing) {
      fs?.readFile(url, (error, contents = Buffer.from("")) => {
        if (!error) {
          setSrc((currentSrc) => {
            const [currentUrl] = Object.keys(currentSrc);

            if (currentUrl) cleanUpBufferUrl(currentUrl);

            return { [url]: bufferToUrl(contents) };
          });
          appendFileToTitle(basename(url));
        }
      });
    }

    return () => cleanUpBufferUrl(src[url]);
  }, [appendFileToTitle, closing, fs, src, url]);

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
          disabled={isMaxZoom}
          extraStyles="h-12 w-12 disabled:pointer-events-none hover:bg-[#4b4b4b80] active:bg-[#64646480]"
          onClick={() => zoom("in")}
        >
          <ZoomIn
            extraStyles={`fill-white h-4 w-full ${isMaxZoom ? "bg-[#7D7D7D]" : ""}`}
          />
        </Button>
        <Button
          title="Zoom out"
          disabled={isMinZoom}
          extraStyles="h-12 w-12 disabled:pointer-events-none hover:bg-[#4b4b4b80] active:bg-[#64646480]"
          onClick={() => zoom("out")}
        >
          <ZoomOut
            extraStyles={`h-4 w-full ${isMinZoom ? "fill-[#7D7D7D]" : "fill-white"}`}
          />
        </Button>
      </nav>
      <figure
        ref={imageContainerRef}
        onWheel={({ deltaY }) => zoom(deltaY < 0 ? "in" : "out")}
        className="flex h-full my-0 mr-8 ml-12 overflow-hidden place-content-center place-items-center w-full"
        {...useDoubleClick(() => zoom("toggle"))}
      >
        {src[url] && (
          <img
            alt={basename(url, extname(url))}
            ref={imageRef}
            src={src[url]}
            {...dragZoomProps}
          />
        )}
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
