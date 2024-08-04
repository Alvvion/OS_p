import { useRef } from "react";

import { useProcesses } from "@/context/Process";

import useFileDrop from "../system/FileManager/useFileDrop";
import type { ContainerProps } from "./types";

const AppContianer: React.FC<ContainerProps> = ({
  id,
  useHook,
  className,
  children,
  ...restProps
}) => {
  const {
    processes: { [id]: { url: currentUrl = "" } = {} },
  } = useProcesses();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useHook(id, currentUrl, containerRef);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      {...useFileDrop({ id })}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default AppContianer;
