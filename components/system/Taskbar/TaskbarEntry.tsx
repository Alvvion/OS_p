import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

import Icon from "@/components/common/Icon";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useNextFocusable from "@/hooks/useNextFocusable";
import { animateTaskbar, buttonVariant, notchVariant } from "@/utils/animate";

import useWindowPeek from "./Peek/useWindowPeek";
import type { TaskbarEntryProps } from "./types";

const TaskbarEntry: React.FC<TaskbarEntryProps> = ({
  src,
  width,
  height,
  name,
  pid,
}) => {
  const {
    minimize,
    processes: { [pid]: { minimized = false } = {} },
    linkElement,
  } = useProcesses();
  const { foregroundId, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(pid);
  const isForeground = foregroundId === pid;

  const isBottomNotch = !!(minimized || !isForeground);

  const onClick = () => {
    if (minimized || isForeground) minimize(pid);
    setForegroundId(isForeground ? nextFocusableId : pid);
  };

  const linkTaskbarEntry = useCallback(
    (taskbarEntry: HTMLButtonElement | null) => {
      if (taskbarEntry instanceof HTMLElement)
        linkElement(pid, "taskbarEntry", taskbarEntry);
    },
    [pid, linkElement],
  );

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

  const { PeekComponent, peekEvents } = useWindowPeek(pid);

  return (
    <div {...peekEvents}>
      <AnimatePresence>{PeekComponent && <PeekComponent />}</AnimatePresence>
      <motion.button
        type="button"
        ref={linkTaskbarEntry}
        className={`m-[5px] p-[5px] rounded-[0.25rem] relative cursor-context-menu hover:${buttonHover} border border-transparent hover:border-[#373737] ${
          isBottomNotch ? "" : buttonHover
        }`}
        style={{
          maxWidth: buttonWidth,
          transition: "background-color 0.5s",
        }}
        onClick={onClick}
        variants={buttonVariant}
        {...animateTaskbar}
      >
        <Icon
          src={src}
          width={width}
          height={height}
          alt={name}
          visibility
          className="active:transform active:scale-[0.85]"
        />
        <motion.div
          className={`h-1 absolute ${
            isBottomNotch ? "w-1.5" : "w-4"
          } bottom-0 left-0 right-0 rounded-[10px] my-[-3px] mx-auto bg-[#9CC6D9] transition-width duration-100 ease-in-out`}
          variants={notchVariant(isBottomNotch)}
          {...animateTaskbar}
        />
      </motion.button>
    </div>
  );
};

export default TaskbarEntry;
