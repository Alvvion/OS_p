import Image from "next/image";

import { StyledStartButton } from "@/styles/components/system/StyledTaskbar";
import { TaskbarButtonType } from "@/types/components/system/Taskbar";

const TaskbarButtons: React.FC<TaskbarButtonType> = ({
  src,
  width,
  height,
  name,
}) => (
  <StyledStartButton>
    <Image src={src} width={width} height={height} alt={name} />
  </StyledStartButton>
);

export default TaskbarButtons;
