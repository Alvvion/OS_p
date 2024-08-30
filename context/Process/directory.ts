import dynamic from "next/dynamic";

import { ICON_PATH } from "@/utils/constants";

import type { Processes } from "./types";

export const processDir: Processes = {
  FileExplorer: {
    Component: dynamic(() => import("@/components/apps/FileExplorer")),
    icon: `${ICON_PATH}win-file-explorer.ico`,
    title: "File Explorer",
    backgroundColor: "#191919",
    titlebarStyle: "File Explorer",
  },
  JSDOS: {
    autoSizing: true,
    backgroundColor: "#000",
    Component: dynamic(() => import("@/components/apps/JSDOS")),
    icon: `${ICON_PATH}jsdos.png`,
    title: "JSDOS",
    lockAspectRatio: true,
  },
  MonacoEditor: {
    backgroundColor: "#1E1E1E",
    Component: dynamic(() => import("@/components/apps/MonacoEditor")),
    defaultSize: {
      height: 400,
      width: 400,
    },
    icon: `${ICON_PATH}monaco.png`,
    title: "Monaco Editor",
  },
  Photos: {
    backgroundColor: "#222",
    Component: dynamic(() => import("@/components/apps/Photos")),
    defaultSize: {
      height: 400,
      width: 500,
    },
    icon: `${ICON_PATH}photos.png`,
    prependTaskbarTitle: true,
    title: "Photos",
  },
  Ruffle: {
    backgroundColor: "#000",
    Component: dynamic(() => import("@/components/apps/Ruffle")),
    defaultSize: {
      height: 400,
      width: 550,
    },
    icon: `${ICON_PATH}ruffle.png`,
    title: "Ruffle",
  },
  SpaceCadet: {
    Component: dynamic(() => import("@/components/apps/SpaceCadet")),
    backgroundColor: "#000",
    defaultSize: {
      height: 440,
      width: 600,
    },
    icon: `${ICON_PATH}pinball.png`,
    lockAspectRatio: true,
    singleton: true,
    title: "Space Cadet",
  },
  TinyMCE: {
    backgroundColor: "#fff",
    Component: dynamic(() => import("@/components/apps/TinyMCE")),
    defaultSize: {
      height: 400,
      width: 400,
    },
    icon: `${ICON_PATH}tinymce.png`,
    singleton: true,
    title: "TinyMCE",
  },
  V86: {
    Component: dynamic(() => import("@/components/apps/V86")),
    allowResizing: false,
    autoSizing: true,
    backgroundColor: "#000",
    icon: `${ICON_PATH}V86.ico`,
    title: "V86",
  },
  VideoPlayer: {
    autoSizing: true,
    backgroundColor: "#000",
    Component: dynamic(() => import("@/components/apps/VideoPlayer")),
    icon: `${ICON_PATH}vlc.png`,
    title: "Video Player",
  },
  Webamp: {
    Component: dynamic(() => import("@/components/apps/Webamp")),
    hasWindow: false,
    icon: `${ICON_PATH}webamp_48.png`,
    title: "Webamp",
    singleton: true,
  },
};

export const getProcess = (processes: string[]): Processes =>
  Object.fromEntries(processes.map((id) => [id, processDir[id]]));

export const STARTUP_PROCESSES: string[] = [];
export const PINNED_PROCESSES: string[] = ["HelloWorld", ...STARTUP_PROCESSES];
