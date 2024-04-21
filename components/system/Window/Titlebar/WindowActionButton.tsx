import { useState } from "react";

import { Button } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";

import { CloseIcon, MaximizedIcon, MaximizeIcon, MinimizeIcon } from "./Icons";

const WindowActionButton = ({ id }: { id: string }) => {
  const { onMinimize, onMaximize, onClose } = useWindowActions(id);
  const {
    processes: {
      [id]: { autoSizing, maximized },
    },
  } = useProcesses();

  const {
    currentTheme: {
      sizes: {
        titlebar: { buttonWidth },
      },
      colors: {
        titlebar: { backgroundHover, disabled, closeHover },
      },
    },
  } = useTheme();

  const [isHover, setIsHover] = useState({
    minimize: false,
    maximize: false,
    close: false,
  });

  return (
    <nav className="cancel flex justify-center">
      <Button
        extraStyles="h-full flex place-content-center place-items-center"
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          backgroundColor: isHover.minimize ? backgroundHover : "transparent",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMinimize}
        onMouseEnter={() => setIsHover((prev) => ({ ...prev, minimize: true }))}
        onMouseLeave={() =>
          setIsHover((prev) => ({ ...prev, minimize: false }))
        }
      >
        <MinimizeIcon />
      </Button>
      <Button
        extraStyles="h-full flex place-content-center place-items-center"
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          // eslint-disable-next-line no-nested-ternary
          backgroundColor: autoSizing
            ? disabled
            : isHover.maximize
            ? backgroundHover
            : "transparent",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMaximize}
        disabled={autoSizing}
        onMouseEnter={() => setIsHover((prev) => ({ ...prev, maximize: true }))}
        onMouseLeave={() =>
          setIsHover((prev) => ({ ...prev, maximize: false }))
        }
      >
        {maximized ? <MaximizedIcon /> : <MaximizeIcon />}
      </Button>
      <Button
        extraStyles="h-full rounded-tr-[5px] flex place-content-center place-items-center"
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          backgroundColor: isHover.close ? closeHover : "transparent",
          transition: "background-color 0.25 ease",
        }}
        onClick={onClose}
        onMouseEnter={() => setIsHover((prev) => ({ ...prev, close: true }))}
        onMouseLeave={() => setIsHover((prev) => ({ ...prev, close: false }))}
      >
        <CloseIcon />
      </Button>
    </nav>
  );
};

export default WindowActionButton;
