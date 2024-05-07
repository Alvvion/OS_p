import { adjustHue } from "polished";

import type { ColorCycle } from "./types";

const colorCycle = (
  initialColor: number,
  callback: (newColor: number) => void,
  fps = 15
): ColorCycle => {
  const timePerFrame = 1000 / fps;
  let lastFrameTime = Date.now();
  let degree = 0;
  let animationFrameId: number;

  const updateColor = () => {
    const currentFrameTime = Date.now();
    const timeSinceLastFrame = currentFrameTime - lastFrameTime;

    if (timeSinceLastFrame > timePerFrame) {
      degree = degree > 360 ? 0 : degree + 1;
      lastFrameTime = currentFrameTime - (timeSinceLastFrame % timePerFrame);

      callback(
        Number(
          adjustHue(degree, `#${initialColor.toString(16)}`).replace("#", "0x")
        )
      );
    }

    animationFrameId = requestAnimationFrame(updateColor);
  };

  animationFrameId = requestAnimationFrame(updateColor);

  const stop = () => cancelAnimationFrame(animationFrameId);

  return { stop };
};

export default colorCycle;
