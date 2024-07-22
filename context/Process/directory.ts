import dynamic from "next/dynamic";

import type { Processes } from "./types";

export const processDir: Processes = {
  FileExplorer: {
    Component: dynamic(() => import("@/components/apps/FileExplorer")),
    icon: "/assets/win-file-explorer.ico",
    title: "File Explorer",
    backgroundColor: "#191919",
    titlebarStyle: "File Explorer",
  },
  JSDOS: {
    autoSizing: true,
    backgroundColor: "#000",
    Component: dynamic(() => import("@/components/apps/JSDOS")),
    icon: "/assets/jsdos.png",
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
    icon: "/assets/monaco.png",
    title: "Monaco Editor",
  },
  Photos: {
    backgroundColor: "#222",
    Component: dynamic(() => import("@/components/apps/Photos")),
    defaultSize: {
      height: 400,
      width: 500,
    },
    icon: "/assets/photos.png",
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
    icon: "/assets/ruffle.png",
    title: "Ruffle",
  },
  TinyMCE: {
    backgroundColor: "#fff",
    Component: dynamic(() => import("@/components/apps/TinyMCE")),
    defaultSize: {
      height: 400,
      width: 400,
    },
    icon: "/assets/tinymce.png",
    title: "TinyMCE",
  },
  V86: {
    Component: dynamic(() => import("@/components/apps/V86")),
    icon: "/assets/V86.ico",
    title: "V86",
    autoSizing: true,
    backgroundColor: "#000",
  },
  Webamp: {
    Component: dynamic(() => import("@/components/apps/Webamp")),
    hasWindow: false,
    icon: "/assets/webamp_48.png",
    title: "Webamp",
    singleton: true,
  },
};

export const getProcess = (processes: string[]): Processes =>
  Object.fromEntries(processes.map((id) => [id, processDir[id]]));

export const STARTUP_PROCESSES: string[] = [];
export const PINNED_PROCESSES: string[] = ["HelloWorld", ...STARTUP_PROCESSES];
