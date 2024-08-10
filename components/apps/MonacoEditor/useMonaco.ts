/* eslint-disable unicorn/no-await-expression-member */
import { loader } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { basename, extname } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { cleanUpGlobals, lockGlobal, unlockGlobal } from "@/utils/globals";

import { config, globals, theme } from "./config";
import { detectLanguage } from "./functions";

const useMonaco = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  const { readFile } = useFileSystem();
  const { appendFileToTitle } = useTitle(id);
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<typeof Monaco>();
  const loadFile = useCallback(async () => {
    if (monaco && editor) {
      unlockGlobal("define");
      editor.getModel()?.dispose();
      editor.setModel(
        monaco.editor.createModel(
          (await readFile(url)).toString(),
          detectLanguage(extname(url)),
          monaco.Uri.parse(url),
        ),
      );
      appendFileToTitle(basename(url));
      setTimeout(() => lockGlobal("define"), 2.5 * 1000);
    }
  }, [appendFileToTitle, editor, monaco, readFile, url]);

  useEffect(() => {
    if (!monaco) {
      unlockGlobal("define");
      loader.config(config);
      loader.init().then((monacoInstance) => {
        lockGlobal("define");
        setMonaco(monacoInstance);
      });
    }
  }, [monaco]);

  useEffect(() => {
    if (monaco && !editor && containerRef.current) {
      setEditor(
        monaco.editor.create(containerRef.current, {
          theme,
          automaticLayout: true,
        }),
      );
      setLoading(false);
    }

    return () => {
      if (editor && monaco) {
        monaco.editor.getModels().forEach((model) => model.dispose());
        editor.dispose();
        cleanUpGlobals(globals);
      }
    };
  }, [containerRef, editor, monaco, setLoading]);

  useEffect(() => {
    if (monaco && editor && url) loadFile();
  }, [editor, loadFile, monaco, url]);
};

export default useMonaco;
