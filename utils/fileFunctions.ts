import type { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";

import type { Shortcut } from "@/types/hooks/FilerInfo";

export const getFileByExtension = (_extension: string): string => "";

export const getShortcut = (path: string, fs: FSModule): Promise<Shortcut> =>
  new Promise((resolve) => {
    fs.readFile(path, (_err, contents = Buffer.from("")) => {
      const { InternetShortcut = { URL: "", IconFile: "" } } = ini.parse(
        contents.toString()
      );

      if (InternetShortcut) {
        resolve(InternetShortcut as Shortcut);
      }
    });
  });
