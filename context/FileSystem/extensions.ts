import type { Extensions } from "./types";

const extensions: Extensions = {
  ".img": {
    icon: "/assets/imageres_5205.ico",
    process: ["V86"],
  },
  ".iso": {
    icon: "/assets/imageres_5205.ico",
    process: ["FileExplorer", "V86"],
  },
  ".jsdos": {
    icon: "/assets/compressed.png",
    process: ["JSDOS"],
  },
  ".mp3": {
    icon: "/assets/music_48.png",
    process: ["Webamp"],
  },
  ".swf": {
    icon: "/assets/ruffle.png",
    process: ["Ruffle"],
  },
  ".wsz": {
    icon: "/assets/music_48.png",
    process: ["Webamp"],
  },
  ".zip": {
    icon: "/assets/compressed.png",
    process: ["FileExplorer"],
  },
};

export default extensions;
