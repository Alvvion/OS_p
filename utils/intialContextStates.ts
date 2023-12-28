import type { ProcessContextType } from "@/types/contexts/process";
import type { SessionContextType } from "@/types/contexts/sessions";

export const initalProcessState: ProcessContextType = { processes: {} };

export const initialSessionState: SessionContextType = {
  themeName: "",
  setThemeName: () => undefined,
};
