import { useEffect, useState } from "react";

import useTitle from "@/components/system/Window/useTitle";
import { useFileSystem } from "@/context/FileSystem";
import useWindowSize from "@/hooks/useWindowSize";
import { bufferToUrl, cleanUpBufferUrl, loadFiles } from "@/utils/functions";

import type { DosCI, WindowWithDos } from "./types";

const useJSDOS = (
  id: string,
  url: string,
  ref: React.MutableRefObject<HTMLDivElement | null>
): void => {
  const { updateWindowSize } = useWindowSize(id);
  const { fs } = useFileSystem();

  const [dos, setDos] = useState<DosCI | null>(null);

  const { appendFileToTitle } = useTitle(id);

  useEffect(() => {
    if (!dos && fs && url && ref?.current) {
      fs.readFile(url, (_err, contents = Buffer.from("")) =>
        loadFiles(["/libs/jsdos/js-dos.js", "/libs/jsdos/js-dos.css"]).then(
          () => {
            const DosWindow = window as WindowWithDos;
            const objectURL = bufferToUrl(contents);

            DosWindow.emulators.pathPrefix = "/libs/jsdos/";

            DosWindow.Dos(ref.current as HTMLDivElement)
              .run(objectURL)
              .then((ci) => {
                appendFileToTitle(url);
                cleanUpBufferUrl(objectURL);
                setDos(ci);
              });
          }
        )
      );
    }

    return () => dos?.exit();
  }, [appendFileToTitle, dos, fs, ref, url]);

  useEffect(() => {
    if (dos) {
      updateWindowSize(dos.frameHeight, dos.frameWidth);

      dos
        .events()
        .onFrameSize((width, height) =>
          updateWindowSize(height * 2, width * 2)
        );
    }
  }, [dos, updateWindowSize]);
};

export default useJSDOS;
