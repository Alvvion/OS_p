import type { ChildrenProp } from "@/types/common";

export type ContextFactory = <T>(
  initialContextState: T,
  useContextState: () => T,
  ContextComponent?: React.ComponentType
) => {
  Provider: React.FC<ChildrenProp>;
  useContext: () => T;
};
