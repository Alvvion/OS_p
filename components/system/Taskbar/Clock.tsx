import { useEffect, useState } from "react";

import { useTheme } from "@/context/Theme";
import useLocaleDateTime from "@/hooks/useDateTImeLocale";

const Clock: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const { date, time, datetime } = useLocaleDateTime(now);

  const updateClock = (): void => setNow(new Date());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      updateClock();
      timeoutId = setInterval(updateClock, 1000);
    }, 1000 - new Date().getMilliseconds());

    return () => clearTimeout(timeoutId);
  }, []);

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
      dateTime={datetime}
      suppressHydrationWarning
      style={{ color: text, fontSize }}
    >
      <span className="text-right w-full tracking-[-0.1px]">{time}</span>
      <span className="text-right w-full tracking-[-0.1px]">{date}</span>
    </time>
  );
};

export default Clock;
