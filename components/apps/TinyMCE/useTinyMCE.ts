import { basename, extname } from "path";
import { useEffect, useState } from "react";
import type { Editor } from "tinymce";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { loadFiles } from "@/utils/functions";

import { config, libs } from "./config";
import { setReadOnlyMode } from "./functions";

const useTinyMCE = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
): void => {
  const [editor, setEditor] = useState<Editor>();
  const { appendFileToTitle } = useTitle(id);
  const { fs } = useFileSystem();

  useEffect(() => {
    loadFiles(libs).then(() => {
      if (containerRef.current && window.tinymce) {
        window.tinymce.init({
          selector: `.${[...containerRef.current.classList].join(".")} div`,
          setup: (activeEditor: Editor) =>
            activeEditor.on("load", () => setEditor(activeEditor)),
          ...config,
        });
      }
    });
  }, [containerRef]);

  useEffect(() => {
    if (url && editor) {
      fs?.readFile(url, (error, contents = Buffer.from("")) => {
        if (!error) {
          if (contents.length > 0) setReadOnlyMode(editor);
          editor.setContent(contents.toString());
          appendFileToTitle(basename(url, extname(url)));
        }
      });
    }

    return () => editor?.destroy();
  }, [appendFileToTitle, editor, fs, url]);
};

export default useTinyMCE;
