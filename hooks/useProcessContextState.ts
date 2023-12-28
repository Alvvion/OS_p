import { useState } from "react";

import type { ProcessContextType } from "@/types/contexts/process";
import { getStartupProcess } from "@/utils/processDir";

const useProcessContextState = (): ProcessContextType => {
  const [processes] = useState(getStartupProcess());

  return { processes };
};

export default useProcessContextState;
