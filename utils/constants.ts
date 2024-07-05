import type { Size } from "@/components/common/types";

export const IMAGE_FILE_EXTENSION = new Set([
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
]);

export const rndDefaults = {
  bounds: "main",
  cancel: ".cancel",
  enableUserSelectHack: false,
  dragHandleClassName: "handle",
  minHeight: "30px",
  minWidth: "366px",
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

export const LOCALE = "en";
export const MILLISEC_IN_SEC = 1000;
export const PROCESS_DELIMITER = "_";

export const DEFAULT_WINDOW_SIZE: Size = {
  height: 200,
  width: 410,
};

export const DEFAULT_WINDOW_TRANSITION_DURATION = 250;

export const MAIN_HEIGHT = 116;

export const SHORTCUT = ".url";

export const ONE_TIME_PASSIVE_EVENT = {
  once: true,
  passive: true,
} as AddEventListenerOptions;

export const TRANSITIONS_IN_MILLISECONDS = {
  DOUBLE_CLICK: 500,
};

export const SYSTEM_FILES = new Set(["/.deletedFiles.log"]);

export const MOUNTABLE_EXTENSIONS = new Set([".iso", ".zip", ".jsdos"]);

export const SAVE_PATH = "/saves";
