import { Image } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import type { ComponentProps } from "@/types/common";

import WindowActionButton from "./WindowActionButton";

const DefaultBar: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: {
      [id]: { icon, title },
    },
  } = useProcesses();

  const {
    currentTheme: {
      colors: {
        titlebar: { bgColor, text },
      },
      sizes: {
        titlebar: { fontSize, height, buttonIconWidth, iconMargin },
      },
    },
  } = useTheme();

  return (
    <header
      className="handle flex justify-between"
      style={{ backgroundColor: bgColor }}
    >
      <h1 style={{ color: text, fontSize, height }} className="font-normal">
        <figure className="flex items-center h-full">
          <Image
            src={icon}
            alt={title}
            style={{
              width: buttonIconWidth,
              height: buttonIconWidth,
              margin: iconMargin,
            }}
          />
          <figcaption>{title}</figcaption>
        </figure>
      </h1>
      <WindowActionButton id={id} />
    </header>
  );
};

export default DefaultBar;