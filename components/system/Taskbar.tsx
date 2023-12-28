import {
  StyledStartButton,
  StyledTaskbar,
  StyledTaskbarEntries,
} from "@/styles/components/system/StylendTaskbar";

import Clock from "./Clock";
import TaskbarEntry from "./TaskbarEntry";

const Taskbar = () => {
  const hi = "Hi";
  return (
    <StyledTaskbar>
      <StyledStartButton>{hi}</StyledStartButton>
      <StyledTaskbarEntries>
        <TaskbarEntry />
      </StyledTaskbarEntries>
      <Clock />
    </StyledTaskbar>
  );
};

export default Taskbar;
