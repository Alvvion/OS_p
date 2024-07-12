const extensions = {
  ".img": {
    icon: "/assets/imageres_5205.ico",
    process: ["V86"],
  },
  ".iso": {
    icon: "/assets/imageres_5205.ico",
    process: ["FileExplorer", "V86"],
  },
  ".jsdos": {
    icon: "/assets/jsdos.png",
    process: ["JSDOS", "FileExplorer"],
  },
  ".mp3": {
    icon: "/assets/music_48.png",
    process: ["Webamp"],
  },
  ".swf": {
    icon: "/assets/ruffle.png",
    process: ["Ruffle"],
  },
  ".whtml": {
    icon: "/assets/tinymce.png",
    process: ["TinyMCE"],
  },
  ".wsz": {
    icon: "/assets/music_48.png",
    process: ["Webamp"],
  },
  ".zip": {
    icon: "/assets/compressed.png",
    process: ["FileExplorer", "JSDOS"],
  },
};

export default extensions;
