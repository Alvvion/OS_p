import { useTheme } from "@/context/Theme";
import type { LocaleDateTime } from "@/types/hooks/DateTimeLocale";
import { LOCALE } from "@/utils/constants";

const useLocaleDateTime = (now: Date): LocaleDateTime => {
  const {
    currentTheme: { formats },
  } = useTheme();
  return {
    date: new Intl.DateTimeFormat(LOCALE, formats.date).format(now),
    time: new Intl.DateTimeFormat(LOCALE, formats.time).format(now),
    tooltip: new Intl.DateTimeFormat(LOCALE, formats.tooltip).format(now),
    datetime: now.toISOString(),
  };
};

export default useLocaleDateTime;
