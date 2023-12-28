import { RefObject, useEffect } from "react";
import * as THREE from "three";
// @ts-expect-error No types defined
import WAVES from "vanta/dist/vanta.waves.min.js";

const useWallpaper = (refElement: RefObject<HTMLElement>) => {
  useEffect(() => {
    const vantaEffect = WAVES({
      el: refElement.current,
      THREE,
      color: 0xbe5a31,
      shininess: 35,
      waveHeight: 15,
      waveSpeed: 0.3,
      zoom: 0.9,
      mouseControls: false,
      touchControls: false,
    });
    return () => vantaEffect?.destroy();
  }, [refElement]);
};

export default useWallpaper;
