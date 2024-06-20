import { useRef } from "react";

import { useProcesses } from "@/context/Process";

import type { ContainerProps } from "./types";

const AppContianer: React.FC<ContainerProps> = ({
  id,
  useHook,
  children,
  ...restProps
}) => {
  const {
    processes: { [id]: { url = "" } = {} },
  } = useProcesses();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useHook(id, url, containerRef);

  return (
    <div ref={containerRef} {...restProps}>
      {children}
    </div>
  );
};

export default AppContianer;
