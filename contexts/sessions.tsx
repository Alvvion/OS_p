import useSessionContextState from "@/hooks/useSessionContextState";
import type { SessionContextType } from "@/types/contexts/sessions";
import contextFactory from "@/utils/contextFactory";
import { initialSessionState } from "@/utils/intialContextStates";

const { context, Provider } = contextFactory<SessionContextType>(
  initialSessionState,
  useSessionContextState
);

export { context as SessionContext, Provider as SessionProvider };
