import type { WallpaperFit } from "@/context/Session/types";

// eslint-disable-next-line import/prefer-default-export
export const cssFit: Record<WallpaperFit, string> = {
  fill: "background-size: cover;",
  fit: `
    background-repeat: no-repeat;
    background-size: contain;
  `,
  stretch: "background-size: 100% auto;",
  tile: "background-size: contain;",
  center: `
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
  `,
};
