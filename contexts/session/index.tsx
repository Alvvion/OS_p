import contextFactory from "@/contexts/contextFactory";
import { initialSessionState } from "@/contexts/intialContextStates";
import useSessionContextState from "@/contexts/session/useSessionContextState";
import type { SessionContextType } from "@/types/contexts/sessions";

const { Provider, useContext } = contextFactory<SessionContextType>(
  initialSessionState,
  useSessionContextState
);

export { Provider as SessionProvider, useContext as useSession };
