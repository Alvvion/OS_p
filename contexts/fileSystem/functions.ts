import type { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";

import type { Shortcut } from "@/types/hooks/FileInfo";

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

export const getIconByFileExtension = (extention: string): string => {
  switch (extention) {
    case ".img":
    case ".iso":
      return "/assets/imageres_5205.ico";
    default:
      return "/assets/ICON2_1.ico";
  }
};

export const getProcessByFileExtension = (extention: string) => {
  switch (extention) {
    case ".img":
    case ".iso":
      return "V86";
    default:
      return "";
  }
};
