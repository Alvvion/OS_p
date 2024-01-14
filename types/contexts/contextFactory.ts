import type { ChildrenProp } from "../genric/ChildrenAsProps";

export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T
) => {
  Provider: React.FC<ChildrenProp>;
  useContext: () => T;
};
