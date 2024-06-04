import { Icon } from "@/components/common";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

import type { TaskbarButtonProps } from "./types";

const _tailwind = ["hover:bg-taskbar-button-hover", "bg-taskbar-button-hover"];

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
  const { startMenuVisible } = useSession();

  const {
    currentTheme: {
      sizes: {
        taskbar: {
          startButton: { width: buttonWidth },
        },
      },
      colors: {
        taskbar: { buttonHover },
      },
    },
  } = useTheme();

  return (
    <button
      type="button"
      style={{
        maxWidth: buttonWidth,
        transition: "background-color 0.5s",
      }}
      className={`m-[5px] p-[5px] rounded-[0.25rem] relative cursor-context-menu hover:${buttonHover} border border-transparent hover:border-[#373737] ${
        reqBottomNotch && !bottomnotch ? buttonHover : ""
      } ${!reqBottomNotch && startMenuVisible ? buttonHover : ""}`}
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
