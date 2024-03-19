import { useTheme } from "styled-components";

import type { LocaleDateTime } from "@/types/hooks/LocaleDateTime";
import { LOCALE } from "@/utils/constants";

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
