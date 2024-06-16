import contextFactory from "../Context Factory";
import type { SessionContextType } from "./types";
import useSessionContextState from "./useSessionState";

const { Provider, useContext } = contextFactory<SessionContextType>(
  useSessionContextState
);

export { Provider as SessionProvider, useContext as useSession };
