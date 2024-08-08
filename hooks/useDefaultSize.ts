import type { Size } from "@/components/common/types";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import { DEFAULT_WINDOW_SIZE } from "@/utils/constants";
import { pxToNumber } from "@/utils/functions";

const useDefaultSize = (id: string): Size => {
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { defaultSize } = process || {};
  const {
    sizes: { titlebar },
  } = useTheme();

  return defaultSize
    ? {
        height: Number(defaultSize.height) + pxToNumber(titlebar.height),
        width: defaultSize.width,
      }
    : DEFAULT_WINDOW_SIZE;
};

export default useDefaultSize;
