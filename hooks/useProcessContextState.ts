import { useState } from "react";

import type { ProcessContextType, Processes } from "@/types/contexts/process";

const useProcessContextState = (
  startupProcesses: Processes
): ProcessContextType => {
  const [processes] = useState(startupProcesses);

  return { processes };
};

export default useProcessContextState;
