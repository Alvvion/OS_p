import { motion } from "framer-motion";
import React from "react";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { CloseIcon } from "@/components/common/Icons";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";
import { animateWindowPeek } from "@/utils/animate";

import type { PeekWindowProps } from "./types";
import useWindowPeek from "./useWindowPeek";

const _tailwind = [
  "active:bg-titlebar-closeActive",
  "hover:bg-titlebar-closeHover",
];

const PeekWindow: React.FC<PeekWindowProps> = ({ id, isPeekVisible }) => {
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
    minimize,
    processes: { [id]: process },
  } = useProcesses();

  const { closing, icon, minimized, title = id } = process || {};
  const { setForegroundId } = useSession();

  const { onClose } = useWindowActions(id);
  const image = useWindowPeek(id);

  const onClick = () => {
    if (minimized) minimize(id);

    setForegroundId(id);
  };

  return image && isPeekVisible ? (
    <motion.div
      className="absolute z-50 w-40 bottom-11 -left-1/2 hover:bg-[#292929] rounded-lg bg-peek"
      style={{ display: closing ? "none" : "block" }}
      onClick={onClick}
      tabIndex={-1}
      {...animateWindowPeek}
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
    </motion.div>
  ) : undefined;
};

export default PeekWindow;
