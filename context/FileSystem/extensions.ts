import { ICON_PATH } from "@/utils/constants";

import type { Extension } from "./types";

const extensions = {
  ".img": {
    icon: `${ICON_PATH}imageres_5205.ico`,
    process: ["V86"],
    type: "Disc Image File",
  },
  ".iso": {
    icon: `${ICON_PATH}imageres_5205.ico`,
    process: ["FileExplorer", "V86"],
    type: "Disk Image File",
  },
  ".jsdos": {
    icon: `${ICON_PATH}jsdos.png`,
    process: ["JSDOS", "FileExplorer"],
  },
  ".mp3": {
    icon: `${ICON_PATH}music_48.png`,
    process: ["Webamp"],
  },
  ".spl": {
    process: ["Ruffle"],
    type: "FutureSplash File",
  },
  ".swf": {
    icon: `${ICON_PATH}ruffle.png`,
    process: ["Ruffle"],
    type: "Shockwave Flash File",
  },
  ".whtml": {
    icon: `${ICON_PATH}tinymce.png`,
    process: ["TinyMCE", "MonacoEditor"],
    type: "WYSIWYG HTML File",
  },
  ".wsz": {
    icon: `${ICON_PATH}music_48.png`,
    process: ["Webamp", "FileExplorer"],
    type: "Winamp Skin File",
  },
  ".zip": {
    icon: `${ICON_PATH}compressed.png`,
    process: ["FileExplorer", "JSDOS"],
    type: "Compressed (zipped) Folder",
  },
};

export type ExtensionType = keyof typeof extensions;
export default extensions as Record<ExtensionType, Extension>;
