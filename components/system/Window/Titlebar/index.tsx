import DefaultBar from "./DefaultBar";
import FileExplorerBar from "./FileExplorerBar";
import type { TitlebarProps } from "./types";

const Titlebar: React.FC<TitlebarProps> = ({ id, bar = "Default" }) => {
  switch (bar) {
    case "File Explorer": {
      return <FileExplorerBar id={id} />;
    }
    default: {
      return <DefaultBar id={id} />;
    }
  }
};

export default Titlebar;
