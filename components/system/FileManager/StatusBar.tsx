import { join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { getFormattedSize } from "@/utils/functions";

import type { StatusBarProps } from "./types";

const StatusBar: React.FC<StatusBarProps> = ({
  count,
  directory,
  selected,
}) => {
  const { exists, stat } = useFileSystem();
  const [selectedSize, setSelectedSize] = useState(-1);
  const updateSelectedSize = useCallback(async (): Promise<void> => {
    let totalSize = 0;

    for (const file of selected) {
      const path = join(directory, file);

      /* eslint-disable no-await-in-loop */
      if (await exists(path)) {
        const stats = await stat(path);

        if (stats.isDirectory()) {
          totalSize = -1;
          break;
        }

        totalSize += stats.size;
      }
      /* eslint-enable no-await-in-loop */
    }

    setSelectedSize(totalSize);
  }, [directory, exists, selected, stat]);

  useEffect(() => {
    updateSelectedSize();
  }, [selected, updateSelectedSize]);

  useEffect(() => {
    updateSelectedSize();
  }, [selected, updateSelectedSize]);

  return (
    <footer className="items-center bg-[#333333] text-white flex text-xs font-thin h-[23px] w-full px-[5px] absolute bottom-0">
      <div
        title="Total item count"
        className="-mt-px px-[10px] flex items-center"
      >
        {count} item{count === 1 ? "" : "s"}
        <div className="border-r-white border-r h-[12px] ml-[10px] " />
      </div>
      {selected.length > 0 && (
        <div
          title="Selected item count and size"
          className="-mt-px px-[10px] flex items-center"
        >
          {selected.length} item{selected.length === 1 ? "" : "s"} selected
          {selectedSize > -1
            ? `${"\u00A0\u00A0"}${getFormattedSize(selectedSize)}`
            : ""}
          <div className="border-r-white border-r h-[12px] ml-[10px] " />
        </div>
      )}
    </footer>
  );
};

export default StatusBar;
