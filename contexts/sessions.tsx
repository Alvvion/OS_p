import useSessionContextState from "@/hooks/useSessionContextState";
import type { SessionContextType } from "@/types/contexts/sessions";
import contextFactory from "@/utils/contextFactory";
import { initialSessionState } from "@/utils/intialContextStates";

const { Provider, useContext } = contextFactory<SessionContextType>(
  initialSessionState,
  useSessionContextState
);

export { Provider as SessionProvider, useContext as useSession };
