import Image from "next/image";

import { StyledStartButton } from "@/styles/components/system/StyledTaskbar";
import type { TaskbarButtonType } from "@/types/components/system/Taskbar";

const TaskbarButtons: React.FC<TaskbarButtonType> = ({
  src,
  width,
  height,
  name,
  ...buttonProps
}) => (
  <StyledStartButton {...buttonProps}>
    <Image priority src={src} width={width} height={height} alt={name} />
  </StyledStartButton>
);

export default TaskbarButtons;
