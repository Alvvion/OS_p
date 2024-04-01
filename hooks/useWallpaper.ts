import type { RefObject } from "react";
import { useEffect } from "react";
import * as THREE from "three";
// @ts-expect-error No types defined
import WAVES from "vanta/dist/vanta.waves.min.js";

import colorCycle from "@/components/system/Desktop/colorCycle";

const vantaSettings = {
  color: 0x172b36,
  shininess: 35,
  waveHeight: 15,
  waveSpeed: 0.3,
  zoom: 0.9,
};

const isWebGLAvailable = typeof WebGLRenderingContext !== "undefined";

const useWallpaper = (refElement: RefObject<HTMLElement>) => {
  useEffect(() => {
    // const isWebGLAvailable = typeof webG
    const vantaEffect =
      refElement && isWebGLAvailable
        ? WAVES({
            el: refElement.current,
            THREE,
            ...vantaSettings,
            mouseControls: false,
            touchControls: false,
          })
        : undefined;

    if (vantaEffect) {
      const { onDestroy } = colorCycle(vantaSettings.color, (color) => {
        vantaEffect.options.color = color;
      });

      vantaEffect.onDestroy = onDestroy;
    }
    return () => vantaEffect?.destroy();
  }, [refElement]);
};

export default useWallpaper;
