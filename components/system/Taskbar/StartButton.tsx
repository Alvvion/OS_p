import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { useTheme } from "@/context/Theme";

import type { StartButtonProps } from "./types";

const StartButton: React.FC<StartButtonProps> = ({
  width,
  height,
  startMenuVisible,
  toggleStartMenu,
}) => {
  const {
    sizes: {
      taskbar: {
        startButton: { width: buttonWidth },
      },
    },
    colors: {
      taskbar: { buttonHover },
    },
  } = useTheme();

  return (
    <Button
      style={{
        maxWidth: buttonWidth,
        transition: "background-color 0.5s",
      }}
      extraStyles={`m-[5px] p-[5px] rounded-[0.25rem] relative cursor-context-menu hover:${buttonHover} border border-transparent hover:border-[#373737] ${
        startMenuVisible ? buttonHover : ""
      }`}
      onClick={() => toggleStartMenu()}
    >
      <Icon
        src="/assets/windows11.png"
        alt="Start Button"
        width={width}
        height={height}
        className="active:transform active:scale-[0.85]"
        visibility
      />
    </Button>
  );
};

export default StartButton;
