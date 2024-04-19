import { useProcesses } from "@/contexts/process";

import FileManager from "../system/FIleManager";

const FileExplorer = ({ id }: { id: string }): React.JSX.Element => {
  const {
    processes: {
      [id]: { url },
    },
  } = useProcesses();

  return <FileManager directory={url || "/"} />;
};

export default FileExplorer;
