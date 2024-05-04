import { useState } from "react";

import { Icon } from "@/components/common";
import { useTheme } from "@/context/Theme";

import type { TaskbarButtonProps } from "./types";

const TaskbarButtons: React.FC<TaskbarButtonProps> = ({
  src,
  width,
  height,
  name,
  reference,
  reqBottomNotch,
  bottomnotch = false,
  ...buttonProps
}) => {
  const {
    currentTheme: {
      sizes: {
        taskbar: {
          startButton: { width: buttonWidth },
        },
      },
    },
  } = useTheme();

  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      style={{
        maxWidth: buttonWidth,
        backgroundColor:
          isHover || (reqBottomNotch && !bottomnotch) ? "#292929" : "inherit",
      }}
      className="m-[5px] p-[5px] rounded-[0.25rem] relative cursor-context-menu"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={reference}
      {...buttonProps}
    >
      <Icon
        src={src}
        width={width}
        height={height}
        alt={name}
        className="active:transform active:scale-[0.85]"
      />
      {reqBottomNotch && (
        <div
          className={`h-1 absolute ${
            bottomnotch ? "w-1.5" : "w-4"
          } bottom-0 left-0 right-0 rounded-[10px] my-[-3px] mx-auto bg-[#9CC6D9] transition-width duration-100 ease-in-out`}
        />
      )}
    </button>
  );
};

export default TaskbarButtons;
