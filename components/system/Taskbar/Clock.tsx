import { useCallback, useState } from "react";

import { useTheme } from "@/context/Theme";
import useWorker from "@/hooks/useWorker";

import type { LocaleTimeDate } from "./clockWorker";
import clockWorker from "./clockWorker";

const Clock: React.FC = () => {
  const [{ date = "", time = "", dateTime = "" }, setNow] =
    useState<LocaleTimeDate>({} as LocaleTimeDate);

  useWorker<LocaleTimeDate>(
    clockWorker,
    useCallback(({ data }) => setNow(data), []),
  );

  const {
    colors: {
      taskbar: { text },
    },
    sizes: {
      taskbar: {
        clock: { fontSize },
      },
    },
  } = useTheme();

  return (
    <time
      className="mr-[10px] flex flex-col justify-end items-end p-[0.3rem] rounded-[0.25rem] place-content-center place-items-center"
      dateTime={dateTime}
      suppressHydrationWarning
      style={{ color: text, fontSize }}
    >
      <span className="text-right w-full tracking-[-0.1px]">{time}</span>
      <span className="text-right w-full tracking-[-0.1px]">{date}</span>
    </time>
  );
};

export default Clock;
