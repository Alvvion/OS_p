import { useTheme } from "styled-components";

import { LocaleDateTime } from "@/types/hooks/LocaleDateTime";

const useLocaleDateTime = (now: Date): LocaleDateTime => {
  const { formats } = useTheme();
  return {
    date: new Intl.DateTimeFormat("en", formats.date).format(now),
    time: new Intl.DateTimeFormat("en", formats.time).format(now),
    tooltip: new Intl.DateTimeFormat("en", formats.tooltip).format(now),
    datetime: now.toISOString(),
  };
};

export default useLocaleDateTime;
