import { useCallback, useState } from "react";

import useLocaleDateTime from "@/hooks/useLocaleDateTime";
import useSyncedClock from "@/hooks/useSyncedClock";
import { StyledClock } from "@/styles/components/system/StyledTaskbar";

const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const { date, time, datetime, tooltip } = useLocaleDateTime(now);

  useSyncedClock(useCallback(() => setNow(new Date()), []));

  return (
    <StyledClock
      dateTime={datetime}
      data-tooltip={tooltip}
      suppressHydrationWarning
    >
      <span>{time}</span>
      <span>{date}</span>
    </StyledClock>
  );
};

export default Clock;
