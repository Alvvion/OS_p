import contextFactory from "../Context Factory";
import { initialSessionState } from "../Context Factory/initialContextStates";
import type { SessionContextType } from "./types";
import useSessionContextState from "./useSessionState";

const { Provider, useContext } = contextFactory<SessionContextType>(
  initialSessionState,
  useSessionContextState
);

export { Provider as SessionProvider, useContext as useSession };
