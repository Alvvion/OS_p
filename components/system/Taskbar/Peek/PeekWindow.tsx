import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { CloseIcon } from "@/components/common/Icons";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";

import type { PeekWindowProps } from "./types";

const _tailwind = [
  "active:bg-titlebar-closeActive",
  "hover:bg-titlebar-closeHover",
];

const PeekWindow: React.FC<PeekWindowProps> = ({ id, image }) => {
  const {
    currentTheme: {
      colors: {
        titlebar: { closeActive, closeHover, text },
      },
      sizes: {
        titlebar: { buttonIconWidth, iconMargin, fontSize },
      },
    },
  } = useTheme();

  const {
    processes: { [id]: process },
  } = useProcesses();

  const { closing, icon, title } = process || {};

  const { onClose } = useWindowActions(id);

  return (
    <div
      className="absolute z-50 w-40 bottom-11 -left-1/2 bg-[#292929] rounded-lg"
      style={{ display: closing ? "none" : "block" }}
    >
      <div className="flex justify-between items-center mx-2">
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
          <figcaption style={{ fontSize, color: text }} className="font-normal">
            {title}
          </figcaption>
        </figure>
        <Button
          extraStyles={`hover:${closeHover} active:${closeActive} my-1 p-2 rounded-md`}
          onClick={onClose}
          title="Close"
        >
          <CloseIcon extraStyles="fill-white w-3" />
        </Button>
      </div>
      <img className="w-full p-2 pt-0" alt={title} src={image} />
    </div>
  );
};

export default PeekWindow;
