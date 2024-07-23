const extensions = {
  ".img": {
    icon: "/System/Icons/imageres_5205.ico",
    process: ["V86"],
  },
  ".iso": {
    icon: "/System/Icons/imageres_5205.ico",
    process: ["FileExplorer", "V86"],
  },
  ".jsdos": {
    icon: "/System/Icons/jsdos.png",
    process: ["JSDOS", "FileExplorer"],
  },
  ".mp3": {
    icon: "/System/Icons/music_48.png",
    process: ["Webamp"],
  },
  ".swf": {
    icon: "/System/Icons/ruffle.png",
    process: ["Ruffle"],
  },
  ".whtml": {
    icon: "/System/Icons/tinymce.png",
    process: ["TinyMCE", "MonacoEditor"],
  },
  ".wsz": {
    icon: "/System/Icons/music_48.png",
    process: ["Webamp", "FileExplorer"],
  },
  ".zip": {
    icon: "/System/Icons/compressed.png",
    process: ["FileExplorer", "JSDOS"],
  },
};

export default extensions;
