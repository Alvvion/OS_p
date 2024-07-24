import type { Extension } from "./types";

const extensions = {
  ".img": {
    icon: "/System/Icons/imageres_5205.ico",
    process: ["V86"],
    type: "Disc Image File",
  },
  ".iso": {
    icon: "/System/Icons/imageres_5205.ico",
    process: ["FileExplorer", "V86"],
    type: "Disk Image File",
  },
  ".jsdos": {
    icon: "/System/Icons/jsdos.png",
    process: ["JSDOS", "FileExplorer"],
  },
  ".mkv": { process: ["VideoPlayer"] },
  ".mp3": {
    icon: "/System/Icons/music_48.png",
    process: ["Webamp"],
  },
  ".mp4": { process: ["VideoPlayer"] },
  ".ogg": { process: ["VideoPlayer"] },
  ".ogm": { process: ["VideoPlayer"] },
  ".ogv": { process: ["VideoPlayer"] },
  ".spl": {
    process: ["Ruffle"],
    type: "FutureSplash File",
  },
  ".swf": {
    icon: "/System/Icons/ruffle.png",
    process: ["Ruffle"],
    type: "Shockwave Flash File",
  },
  ".whtml": {
    icon: "/System/Icons/tinymce.png",
    process: ["TinyMCE", "MonacoEditor"],
    type: "WYSIWYG HTML File",
  },
  ".webm": { process: ["VideoPlayer"] },
  ".wsz": {
    icon: "/System/Icons/music_48.png",
    process: ["Webamp", "FileExplorer"],
    type: "Winamp Skin File",
  },
  ".zip": {
    icon: "/System/Icons/compressed.png",
    process: ["FileExplorer", "JSDOS"],
    type: "Compressed (zipped) Folder",
  },
};

export type ExtensionType = keyof typeof extensions;
export default extensions as Record<ExtensionType, Extension>;
