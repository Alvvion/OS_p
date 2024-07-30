import { extname } from "path";
import type videojs from "video.js";

export const config = {
  autoplay: true,
  controlBar: {
    children: [
      "playToggle",
      "currentTimeDisplay",
      "progressControl",
      "durationDisplay",
      "volumePanel",
      "pictureInPictureToggle",
      "fullscreenToggle",
    ],
    volumePanel: {
      inline: false,
    },
  },
  preload: "auto" as videojs.Preload,
};

export const libs = [
  "/Program Files/Video.js/video-js.min.css",
  "/Program Files/Video.js/video.min.js",
];

export const ytLib = "/Program Files/Video.js/Youtube.min.js";

export const getVideoType = (url: string): string | undefined => {
  switch (extname(url)) {
    case ".mkv":
    case ".mp4": {
      return "video/mp4";
    }
    case ".ogg":
    case ".ogm":
    case ".ogv": {
      return "video/ogg";
    }
    case ".webm": {
      return "video/webm";
    }
    default: {
      return undefined;
    }
  }
};
