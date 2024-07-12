import Editor, { loader } from "@monaco-editor/react";
import { basename } from "path";
import { useEffect, useState } from "react";

import type { ComponentProps } from "@/components/common/types";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import useTitle from "@/hooks/useTitle";

import { overrideSubMenuStyling } from "./functions";

const MonacoEditor: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: { [id]: { url = "" } = {} },
  } = useProcesses();
  const { fs } = useFileSystem();
  const { appendFileToTitle } = useTitle(id);
  const { sizes } = useTheme();

  const [value, setValue] = useState("");

  useEffect(() => {
    fs?.readFile(url, (error, contents = Buffer.from("")) => {
      if (!error) {
        setValue(contents.toString());
        appendFileToTitle(basename(url));
      }
    });
  }, [appendFileToTitle, fs, url]);

  loader.config({ paths: { vs: "/libs/monaco/vs" } });

  return (
    <div
      onBlur={overrideSubMenuStyling}
      className="w-full text-white"
      style={{ height: `calc(100% - ${sizes.taskbar.height})` }}
    >
      <Editor path={url} theme="vs-dark" value={value} />
    </div>
  );
};

export default MonacoEditor;
