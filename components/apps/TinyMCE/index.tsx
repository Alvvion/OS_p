import { Editor } from "@tinymce/tinymce-react";
import { basename, extname } from "path";
import { useEffect, useState } from "react";
import type { Editor as EditorInstance } from "tinymce";

import type { ComponentProps } from "@/components/common/types";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useTitle from "@/hooks/useTitle";

import config from "./config";
import { setReadOnlyMode } from "./functions";

const TinyMCE: React.FC<ComponentProps> = ({ id }) => {
  const [editor, setEditor] = useState<EditorInstance>();
  const { appendFileToTitle } = useTitle(id);
  const { setForegroundId } = useSession();
  const { fs } = useFileSystem();
  const {
    processes: { [id]: { url = "" } = {} },
  } = useProcesses();
  const { sizes } = useTheme();

  const maybeMaintainFocus: React.FocusEventHandler = ({ relatedTarget }) => {
    if (
      relatedTarget instanceof HTMLElement &&
      document.body.querySelector(".tox-tinymce-aux")?.contains(relatedTarget)
    )
      setForegroundId(id);
  };

  useEffect(() => {
    if (url && editor) {
      fs?.readFile(url, (error, contents = Buffer.from("")) => {
        if (!error) {
          setReadOnlyMode(editor);
          editor.setContent(contents.toString());
          appendFileToTitle(basename(url, extname(url)));
        }
      });
    }

    return () => editor?.destroy();
  }, [appendFileToTitle, editor, fs, url]);

  return (
    <div
      onBlur={maybeMaintainFocus}
      style={{ height: `calc(100% - ${sizes.taskbar.height})` }}
      className="tinymce"
    >
      <Editor
        onInit={(_event, activeEditor) => setEditor(activeEditor)}
        {...config}
      />
    </div>
  );
};

export default TinyMCE;
