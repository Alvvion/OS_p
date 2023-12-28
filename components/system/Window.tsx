import StyledWindow from "@/styles/components/system/StyledWindow";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const Window: React.FC<ChildrenProp> = ({ children }) => (
  <StyledWindow>{children}</StyledWindow>
);

export default Window;
