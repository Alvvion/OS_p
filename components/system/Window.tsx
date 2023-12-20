import type { FC } from "react";

import StyledWindow from "@/styles/components/system/Window";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const Window: FC<ChildrenProp> = ({ children }) => (
  <StyledWindow>{children}</StyledWindow>
);

export default Window;
