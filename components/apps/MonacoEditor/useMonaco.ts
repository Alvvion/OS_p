import { loader } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { basename } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { cleanUpGlobals } from "@/utils/functions";

import { config, globals, theme } from "./config";

const useMonaco = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
): void => {
  const { fs } = useFileSystem();
  const { appendFileToTitle } = useTitle(id);
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor>();

  const loadMonaco = useCallback(
    (value?: string, language?: string): void => {
      loader.config(config);
      loader.init().then((monaco) => {
        if (containerRef.current) {
          setEditor(
            monaco.editor.create(containerRef.current, {
              model: monaco.editor.createModel(
                value || "",
                language,
                monaco.Uri.parse(url),
              ),
              theme,
              automaticLayout: true,
            }),
          );
        }
      });
    },
    [containerRef, url],
  );

  useEffect(() => {
    if (!editor) {
      if (url) {
        fs?.readFile(url, (error, contents = Buffer.from("")) => {
          if (!error) {
            loadMonaco(contents.toString());
            appendFileToTitle(basename(url));
          }
        });
      } else {
        loadMonaco();
      }
    }

    return () => {
      if (editor) {
        editor.getModel()?.dispose();
        editor.dispose();
        cleanUpGlobals(globals);
      }
    };
  }, [appendFileToTitle, editor, fs, loadMonaco, url]);
};

export default useMonaco;
