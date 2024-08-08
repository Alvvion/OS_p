import { useRef, useState } from "react";

import { useProcesses } from "@/context/Process";

import useFileDrop from "../system/FileManager/useFileDrop";
import Loading from "./Loading";
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
  const [loading, setLoading] = useState(true);
  const fileDrop = useFileDrop({ id });

  useHook(id, currentUrl, containerRef, setLoading, loading);

  return loading ? (
    <Loading />
  ) : (
    <div
      ref={containerRef}
      className={`${className}`}
      {...fileDrop}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default AppContianer;
