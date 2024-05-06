import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

import { Button, Icon } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import type { ComponentProps } from "@/types/common";

import WindowActionButton from "./WindowActionButton";

const _tailwind = ["hover:bg-titlebar-backgroundHover"];

const FileExplorerBar: React.FC<ComponentProps> = ({ id }) => {
  const {
    currentTheme: {
      colors: {
        titlebar: { bgColor, text, backgroundHover },
      },
      sizes: {
        titlebar: { height, buttonIconWidth, iconMargin, fontSize },
      },
    },
  } = useTheme();

  const {
    processes: {
      [id]: { icon, title },
    },
  } = useProcesses();

  return (
    <header
      style={{ backgroundColor: bgColor }}
      className="w-full handle flex justify-between"
    >
      <div className="flex items-center gap-1">
        <div
          className="min-w-fit w-48 flex-1 bg-[#2C2C2C] h-3/4 mt-[5px] ml-2 rounded-t-md flex items-center justify-between px-1"
          style={{ height }}
        >
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
            <figcaption
              style={{ fontSize, color: text }}
              className="font-normal"
            >
              {title}
            </figcaption>
          </figure>
          <Button extraStyles={`p-[2px] rounded-sm hover:${backgroundHover}`}>
            <IoCloseOutline style={{ color: text }} />
          </Button>
        </div>
        <Button
          extraStyles={`p-[2px] rounded-lg mt-1 hover:${backgroundHover}`}
        >
          <IoAddOutline style={{ color: text }} />
        </Button>
      </div>
      <WindowActionButton id={id} />
    </header>
  );
};

export default FileExplorerBar;
