import { basename, extname } from "path";
import { useCallback, useEffect, useState } from "react";
import type { Editor, NotificationSpec } from "tinymce";

import useFileDrop from "@/components/system/FileManager/useFileDrop";
import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { loadFiles } from "@/utils/functions";

import { config, libs } from "./config";
import { setReadOnlyMode } from "./functions";

const useTinyMCE = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  const [editor, setEditor] = useState<Editor>();
  const { appendFileToTitle } = useTitle(id);
  const { readFile, writeFile } = useFileSystem();
  const { onDragOver, onDrop } = useFileDrop({ id });

  const onSave = useCallback(
    async (activeEditor: Editor) => {
      const saveSpec: NotificationSpec = {
        closeButton: true,
        text: "Successfully saved.",
        timeout: 5000,
        type: "success",
      };

      try {
        await writeFile(url, activeEditor.getContent(), true);
      } catch {
        saveSpec.text = "Error occurred while saving.";
        saveSpec.type = "error";
      }

      activeEditor.notificationManager.open(saveSpec);
    },
    [url, writeFile],
  );
  const loadFile = useCallback(async () => {
    const fileContents = await readFile(url);

    if (fileContents.length > 0 && editor) setReadOnlyMode(editor);

    editor?.setContent(fileContents.toString());
    appendFileToTitle(basename(url, extname(url)));
  }, [appendFileToTitle, editor, readFile, url]);

  useEffect(() => {
    if (!editor) {
      loadFiles(libs).then(() => {
        if (containerRef.current && window.tinymce) {
          window.tinymce
            .init({
              save_onsavecallback: onSave,
              selector: `.${[...containerRef.current.classList].join(".")} div`,
              ...config,
            })
            .then(([activeEditor]) => {
              const iframe = containerRef.current?.querySelector("iframe");

              if (iframe?.contentWindow) {
                iframe.contentWindow.addEventListener("dragover", onDragOver);
                iframe.contentWindow.addEventListener("drop", onDrop);
              }

              setEditor(activeEditor);
              setLoading(false);
            });
        }
      });
    }
  }, [containerRef, editor, onDragOver, onDrop, onSave, setLoading]);

  useEffect(() => {
    if (url && editor) loadFile();
  }, [editor, loadFile, url]);

  useEffect(() => () => editor?.destroy(), [editor]);
};

export default useTinyMCE;
