import type { ChildrenProp } from "../genric/ChildrenAsProps";

export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T
) => {
  context: React.Context<T>;
  Provider: React.FC<ChildrenProp>;
};
