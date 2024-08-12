import { basename, extname, relative } from "path";
import { useCallback, useEffect, useState } from "react";
import type { Editor, NotificationSpec } from "tinymce";

import useFileDrop from "@/components/system/FileManager/useFileDrop";
import { useFileSystem } from "@/context/FileSystem";
import { getProcessByFileExtension } from "@/context/FileSystem/functions";
import { useProcesses } from "@/context/Process";
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
  const { openProcess } = useProcesses();

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
  const linksToProcesses = useCallback(() => {
    const iframe = containerRef.current?.querySelector("iframe");

    if (iframe?.contentWindow) {
      [...iframe.contentWindow.document.links].forEach((link) =>
        link.addEventListener("click", (event) => {
          const isRelative =
            // eslint-disable-next-line dot-notation
            relative(link.dataset["mceHref"] || "", link.pathname) === "";

          if (isRelative) {
            event.stopPropagation();
            event.preventDefault();

            const defaultProcess = getProcessByFileExtension(
              extname(link.pathname),
            );

            if (defaultProcess) openProcess(defaultProcess, link.pathname);
          }
        }),
      );
    }
  }, [containerRef, openProcess]);
  const loadFile = useCallback(async () => {
    if (editor) {
      const fileContents = await readFile(url);
      if (fileContents.length > 0 && editor) setReadOnlyMode(editor);
      editor.setContent(fileContents.toString());
      // eslint-disable-next-line dot-notation
      editor.settings["save_onsavecallback"] = onSave;

      linksToProcesses();

      appendFileToTitle(basename(url, extname(url)));
    }
  }, [appendFileToTitle, editor, linksToProcesses, onSave, readFile, url]);

  useEffect(() => {
    if (!editor) {
      loadFiles(libs).then(() => {
        if (containerRef.current && window.tinymce) {
          window.tinymce
            .init({
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
  }, [containerRef, editor, onDragOver, onDrop, setLoading]);

  useEffect(() => {
    if (url && editor) loadFile();
  }, [editor, loadFile, url]);

  useEffect(() => () => editor?.destroy(), [editor]);
};

export default useTinyMCE;
