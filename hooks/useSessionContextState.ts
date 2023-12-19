import { SessionContextType } from "@/types/contexts/sessions";

const useSessionContextState = (): SessionContextType => ({
  theme: undefined,
});

export default useSessionContextState;
