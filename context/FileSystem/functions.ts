import type { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";

import type { Extentions, Shortcut } from "./types";

export const getShortcut = (path: string, fs: FSModule): Promise<Shortcut> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, contents = Buffer.from("")) => {
      if (err) {
        reject(err);
      } else {
        const { InternetShortcut = { BaseURL: "", URL: "", IconFile: "" } } =
          ini.parse(contents.toString());

        if (InternetShortcut) {
          resolve(InternetShortcut as Shortcut);
        }
      }
    });
  });

export const extensions: Extentions = {
  ".img": {
    icon: "/assets/imageres_5205.ico",
    process: ["V86"],
  },
  ".iso": {
    icon: "/assets/imageres_5205.ico",
    process: ["V86", "V86"],
  },
  ".jsdos": {
    icon: "/assets/compressed.png",
    process: ["JSDOS"],
  },
  ".zip": {
    icon: "/assets/compressed.png",
    process: ["JSDOS"],
  },
  ".mp3": {
    icon: "/assets/music_48.png",
    process: ["Webamp"],
  },
  ".wsz": {
    icon: "/assets/music_48.png",
    process: ["Webamp"],
  },
};

export const getIconByFileExtension = (extention: string): string =>
  extensions[extention]?.icon || "/assets/ICON2_1.ico";

export const getProcessByFileExtension = (extention: string): string =>
  extensions[extention]?.process[0] || "";
