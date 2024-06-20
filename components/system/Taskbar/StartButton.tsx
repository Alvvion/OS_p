import { Button, Icon } from "@/components/common";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

import type { StartButtonProps } from "./types";

const StartButton: React.FC<StartButtonProps> = ({
  src,
  alt,
  width,
  height,
  onClick,
}) => {
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

  const { startMenuVisible } = useSession();

  return (
    <Button
      style={{
        maxWidth: buttonWidth,
        transition: "background-color 0.5s",
      }}
      extraStyles={`m-[5px] p-[5px] rounded-[0.25rem] relative cursor-context-menu hover:${buttonHover} border border-transparent hover:border-[#373737] ${
        startMenuVisible ? buttonHover : ""
      }`}
      onClick={onClick}
    >
      <Icon
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="active:transform active:scale-[0.85]"
        visibility
      />
    </Button>
  );
};

export default StartButton;
