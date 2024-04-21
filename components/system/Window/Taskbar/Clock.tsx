import { useCallback, useState } from "react";

import { useTheme } from "@/context/Theme";
import useLocaleDateTime from "@/hooks/useDateTImeLocale";

import useSyncedClock from "./useSyncedClock";

const Clock: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const { date, time, datetime, tooltip } = useLocaleDateTime(now);

  useSyncedClock(useCallback(() => setNow(new Date()), []));

  const {
    currentTheme: {
      colors: {
        taskbar: { text },
      },
      sizes: {
        taskbar: {
          clock: { fontSize },
        },
      },
    },
  } = useTheme();

  return (
    <time
      className="mr-[10px] flex flex-col justify-end items-end p-[0.3rem] rounded-[0.25rem] place-content-center place-items-center"
      dateTime={datetime}
      data-tooltip={tooltip}
      suppressHydrationWarning
      style={{ color: text, fontSize }}
    >
      <span className="text-right w-full">{time}</span>
      <span className="text-right w-full">{date}</span>
    </time>
  );
};

export default Clock;
