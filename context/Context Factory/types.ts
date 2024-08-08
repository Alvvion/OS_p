import type { ChildrenProp } from "@/types/common";

export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T
) => {
  Provider: React.FC<ChildrenProp>;
  useContext: () => T;
};
