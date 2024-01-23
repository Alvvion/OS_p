const centered = "flex place-content-center place-items-center";
const IMAGE_FILE_EXTENSION = [
  ".apng",
  ".avif",
  ".bmp",
  ".cur",
  ".gif",
  ".ico",
  ".jfif",
  ".jif",
  ".jpe",
  ".jpeg",
  ".jpg",
  ".pjp",
  ".pjpeg",
  ".png",
  ".svg",
  ".tif",
  ".tiff",
  ".webp",
  ".xbm",
];

const rndDefaults = {
  bounds: "main",
  cancel: ".cancel",
  enableUserSelectHack: false,
  dragHandleClassName: "handle",
  resizeHandleStyles: {
    bottom: {
      bottom: "-3px",
      cursor: "ns-resize",
      height: "6px",
    },
    top: {
      top: "-3px",
      cursor: "ns-resize",
      height: "6px",
    },
    left: {
      left: "-3px",
      cursor: "ew-resize",
      width: "6px",
    },
    right: {
      right: "-3px",
      cursor: "ew-resize",
      width: "6px",
    },
    bottomLeft: {
      bottom: "-3px",
      cursor: "nesw-resize",
      height: "12px",
      width: "12px",
      left: "-3px",
    },
    topLeft: {
      top: "-3px",
      cursor: "nwse-resize",
      height: "12px",
      width: "12px",
      left: "-3px",
    },
    bottomRight: {
      bottom: "-3px",
      cursor: "nwse-resize",
      height: "12px",
      width: "12px",
      right: "-3px",
    },
    topRight: {
      top: "-3px",
      cursor: "nesw-resize",
      height: "12px",
      width: "12px",
      right: "-3px",
    },
  },
};

export { centered, IMAGE_FILE_EXTENSION, rndDefaults };
