import { Button } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";

import { CloseIcon, MaximizedIcon, MaximizeIcon, MinimizeIcon } from "./Icons";

const _tailwind = [
  "hover:bg-titlebar-backgroundHover",
  "bg-titlebar-button-disabled",
  "hover:bg-titlebar-closeHover",
];

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

  return (
    <nav className="cancel flex justify-center">
      <Button
        extraStyles={`h-full flex place-content-center place-items-center hover:${backgroundHover}`}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMinimize}
      >
        <MinimizeIcon />
      </Button>
      <Button
        extraStyles={`h-full flex place-content-center place-items-center ${
          autoSizing ? disabled : `hover:${backgroundHover}`
        }`}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMaximize}
        disabled={autoSizing}
      >
        {maximized ? <MaximizedIcon /> : <MaximizeIcon />}
      </Button>
      <Button
        extraStyles={`h-full rounded-tr-[5px] flex place-content-center place-items-center hover:${closeHover}`}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </Button>
    </nav>
  );
};

export default WindowActionButton;
