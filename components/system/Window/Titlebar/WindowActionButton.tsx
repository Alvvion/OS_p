/* eslint-disable no-nested-ternary */
import { useMemo } from "react";

import { Button } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";

import { CloseIcon, MaximizedIcon, MaximizeIcon, MinimizeIcon } from "./Icons";

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

const WindowActionButton = ({ id }: { id: string }) => {
  const { onMinimize, onMaximize, onClose } = useWindowActions(id);
  const {
    processes: {
      [id]: { autoSizing, maximized },
    },
  } = useProcesses();

  const { foregroundId } = useSession();

  const isForeground = useMemo(() => id === foregroundId, [foregroundId, id]);

  const {
    currentTheme: {
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
          autoSizing ? disabled : `hover:${backgroundHover}`
        } active:${backgroundActive}`}
        style={{
          width: buttonWidth,
          boxSizing: "border-box",
          transition: "background-color 0.25 ease",
        }}
        onClick={onMaximize}
        disabled={autoSizing}
      >
        {maximized ? (
          <MaximizedIcon
            extraStyles={`${isForeground ? "fill-white" : buttonInactive}`}
          />
        ) : (
          <MaximizeIcon
            extraStyles={`${
              autoSizing
                ? isForeground
                  ? disabled
                  : disabledInactive
                : isForeground
                ? "fill-white"
                : buttonInactive
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
