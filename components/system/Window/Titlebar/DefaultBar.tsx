import Icon from "@/components/common/Icon";
import type { ComponentProps } from "@/components/common/types";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import { PREVENT_SCROLL } from "@/utils/constants";

import useTitlebarContextMenu from "../../Menu/ContextMenu/useTitlebarContextMenu";
import WindowActionButton from "./WindowActionButton";

const DefaultBar: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: { [id]: process },
  } = useProcesses();

  const { componentWindow, icon, title } = process || {};

  const {
    colors: {
      titlebar: { bgColor, text },
    },
    sizes: {
      titlebar: { fontSize, height, buttonIconWidth, iconMargin },
    },
  } = useTheme();

  return (
    <header
      className="handle flex justify-between z-10"
      style={{ backgroundColor: bgColor }}
      onTouchStartCapture={({ target }) => {
        if (target instanceof HTMLElement) target.click();
        componentWindow?.focus(PREVENT_SCROLL);
      }}
      {...useTitlebarContextMenu(id)}
    >
      <h1 style={{ color: text, fontSize, height }} className="font-normal">
        <figure className="flex items-center h-full">
          <Icon
            src={icon}
            alt={title}
            style={{
              width: buttonIconWidth,
              height: buttonIconWidth,
              margin: iconMargin,
            }}
          />
          <figcaption className="text-ellipsis tracking-[-0.1px] overflow-hidden whitespace-nowrap">
            {title}
          </figcaption>
        </figure>
      </h1>
      <WindowActionButton id={id} />
    </header>
  );
};

export default DefaultBar;
