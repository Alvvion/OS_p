import { useRef } from "react";

import { useProcesses } from "@/contexts/process";
import { StyledJSDOS } from "@/styles/components/apps/JSDOS";

import useJSDOS from "./useJSDOS";

const JSDOS = ({ id }: { id: string }): React.JSX.Element => {
  const {
    processes: {
      [id]: { url = "" },
    },
  } = useProcesses();
  const screenRef = useRef<HTMLDivElement | null>(null);

  useJSDOS(id, url, screenRef);

  return <StyledJSDOS ref={screenRef} />;
};

export default JSDOS;
