import { useProcesses } from "@/context/Process";

import FileManager from "../../system/FileManager";

const FileExplorer = ({ id }: { id: string }): React.JSX.Element => {
  const {
    processes: {
      [id]: { url },
    },
  } = useProcesses();

  return <FileManager directory={url || "/"} />;
};

export default FileExplorer;
