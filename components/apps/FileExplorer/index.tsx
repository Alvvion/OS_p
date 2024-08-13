import { basename } from "path";
import { useEffect, useState } from "react";

import type { ComponentProps } from "@/components/common/types";
import FileManager from "@/components/system/FileManager";
import { useFileSystem } from "@/context/FileSystem";
import { getIconFromIni } from "@/context/FileSystem/functions";
import { useProcesses } from "@/context/Process";
import { ICON_PATH } from "@/utils/constants";

import Navigation from "./Navigation";

const FileExplorer: React.FC<ComponentProps> = ({ id }) => {
  const {
    icon: setProcessIcon,
    processes: { [id]: process },
    title,
  } = useProcesses();
  const { closing = false, icon = "", url = "" } = process || {};
  const { fs } = useFileSystem();
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    const directoryName = basename(url);

    if (url) {
      title(id, directoryName || "This PC");

      if (fs && (!icon || url !== currentUrl)) {
        setProcessIcon(
          id,
          `${ICON_PATH}${directoryName ? "folder" : "This PC"}.ico`,
        );
        getIconFromIni(fs, url).then((iconFile) =>
          setProcessIcon(id, iconFile),
        );
        setCurrentUrl(url);
      }
    }
  }, [currentUrl, fs, icon, id, setProcessIcon, title, url]);

  return url ? (
    <div className="h-full">
      <Navigation id={id} />
      <FileManager
        url={url}
        id={id}
        closing={closing}
        scrollable
        isExplorerer
      />
    </div>
  ) : undefined;
};

export default FileExplorer;
