import type { ChildrenProp } from "@/components/common/types";

export type ContextFactory = <T>(
  useContextState: () => T,
  ContextComponent?: React.ComponentType,
) => {
  Provider: React.FC<ChildrenProp>;
  useContext: () => T;
};
