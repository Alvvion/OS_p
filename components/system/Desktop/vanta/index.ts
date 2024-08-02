import { loadFiles } from "@/utils/functions";

import colorCycle from "../colorCylce";
import type { VantaWavesConfig } from "../types";

const libs = [
  "/System/Vanta.js/three.min.js",
  "/System/Vanta.js/vanta.waves.min.js",
];
const isWebGLAvailable = typeof WebGLRenderingContext !== "undefined";

const disableControls = {
  mouseControls: false,
  touchControls: false,
};

const vantaWaves =
  (config: VantaWavesConfig) =>
  (el?: HTMLElement | null): void => {
    const { VANTA } = window;
    VANTA?.current?.destroy();

    if (!el) return;

    loadFiles(libs).then(() => {
      const { VANTA: { WAVES } = {} } = window;
      const vantaEffect =
        isWebGLAvailable && WAVES
          ? WAVES({ el, ...disableControls, ...config })
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
