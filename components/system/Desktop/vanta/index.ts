import { loadFiles } from "@/utils/functions";

import colorCycle from "../colorCylce";
import type { VantaWavesConfig } from "../types";

const libs = ["/libs/vanta/three.min.js", "/libs/vanta/vanta.waves.min.js"];
const isWebGLAvailable = typeof WebGLRenderingContext !== "undefined";

const disableControls = {
  mouseControls: false,
  touchControls: false,
};

const vantaWaves =
  (config: VantaWavesConfig) =>
  (el: HTMLElement | null): void => {
    loadFiles(libs).then(() => {
      const { VANTA } = window;

      VANTA?.current?.destroy();

      const vantaEffect =
        el && isWebGLAvailable
          ? VANTA?.WAVES({ el, ...disableControls, ...config })
          : undefined;

      if (vantaEffect) {
        const { stop: stopColorCycle } = colorCycle(config.color, (color) =>
          vantaEffect.setOptions({ color }),
        );

        vantaEffect.onDestroy = stopColorCycle;
      }
    });
  };

export default vantaWaves;
