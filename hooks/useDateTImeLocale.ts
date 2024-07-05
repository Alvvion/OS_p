import { useTheme } from "@/context/Theme";
import { LOCALE } from "@/utils/constants";

import type { LocaleDateTime } from "./types";

const useLocaleDateTime = (now: Date): LocaleDateTime => {
  const { formats } = useTheme();
  return {
    date: new Intl.DateTimeFormat(LOCALE, formats.date).format(now),
    time: new Intl.DateTimeFormat(LOCALE, formats.time).format(now),
    tooltip: new Intl.DateTimeFormat(LOCALE, formats.tooltip).format(now),
    datetime: now.toISOString(),
  };
};

export default useLocaleDateTime;
