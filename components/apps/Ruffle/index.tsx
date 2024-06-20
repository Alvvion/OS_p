import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";
import { useTheme } from "@/context/Theme";

import useRuffle from "./useRuffle";

const Ruffle: React.FC<ComponentProps> = ({ id }) => {
  const {
    currentTheme: {
      sizes: { titlebar },
    },
  } = useTheme();

  return (
    <AppContianer
      id={id}
      useHook={useRuffle}
      style={{ height: `calc(100% - ${titlebar.height}) !important` }}
      className="[&_canvas]:h-full [&_canvas]:w-full"
    />
  );
};

export default Ruffle;
