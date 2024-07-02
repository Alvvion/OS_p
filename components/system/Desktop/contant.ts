import type { WallpaperFit } from "@/context/Session/types";

// eslint-disable-next-line import/prefer-default-export
export const cssFit: Record<WallpaperFit, string> = {
  fill: "background-size: cover;",
  fit: `
    background-repeat: no-repeat;
    background-size: contain;
  `,
  stretch: "background-size: 100% 100%;",
  tile: "",
  center: "background-repeat: no-repeat;",
};
