/* eslint-disable no-nested-ternary */
import Button from "@/components/common/Button";
import {
  CloseIcon,
  MaximizedIcon,
  MaximizeIcon,
  MinimizeIcon,
} from "@/components/common/Icons";
import type { ComponentProps } from "@/components/common/types";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";

const _tailwind = [
  "hover:bg-titlebar-backgroundHover",
  "bg-titlebar-button-disabled",
  "hover:bg-titlebar-closeHover",
  "active:bg-titlebar-backgroundActive",
  "active:bg-titlebar-closeActive",
  "fill-titlebar-button-disabled",
  "fill-titlebar-button-disabledInactive",
  "fill-titlebar-buttonInactive",
];

const WindowActionButton: React.FC<ComponentProps> = ({ id }) => {
  const { onMinimize, onMaximize, onClose } = useWindowActions(id);
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { allowResizing = true, maximized } = process || {};

  const { foregroundId } = useSession();

  const isForeground = id === foregroundId;

  const {
    sizes: {
      titlebar: { buttonWidth },
    },
    colors: {
      titlebar: {
        backgroundHover,
        disabled,
        closeHover,
        backgroundActive,
        closeActive,
        disabledInactive,
        buttonInactive,
      },
    },
  } = useTheme();

  return (
    <nav className="cancel flex justify-center">
      <Button
        extraStyles={`h-full flex place-content-center place-items-center hover:${backgroundHover} active:${backgroundActive} `}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMinimize}
      >
        <MinimizeIcon
          extraStyles={`${isForeground ? "fill-white" : buttonInactive}`}
        />
      </Button>
      <Button
        extraStyles={`h-full flex place-content-center place-items-center ${
          allowResizing ? `hover:${backgroundHover}` : disabled
        } active:${backgroundActive}`}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMaximize}
        disabled={!allowResizing}
      >
        {maximized ? (
          <MaximizedIcon
            extraStyles={`${isForeground ? "fill-white" : buttonInactive}`}
          />
        ) : (
          <MaximizeIcon
            extraStyles={`${
              allowResizing
                ? isForeground
                  ? "fill-white"
                  : buttonInactive
                : isForeground
                  ? disabled
                  : disabledInactive
            }`}
          />
        )}
      </Button>
      <Button
        extraStyles={`h-full rounded-tr-[5px] flex place-content-center place-items-center hover:${closeHover} active:${closeActive}`}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onClose}
      >
        <CloseIcon
          extraStyles={`${isForeground ? "fill-white" : buttonInactive}`}
        />
      </Button>
    </nav>
  );
};

export default WindowActionButton;
