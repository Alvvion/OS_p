import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";
import { useTheme } from "@/context/Theme";

import { overrideSubMenuStyling } from "./functions";
import useMonaco from "./useMonaco";

const MonacoEditor: React.FC<ComponentProps> = ({ id }) => {
  const { sizes } = useTheme();

  return (
    <AppContianer
      id={id}
      useHook={useMonaco}
      onBlur={overrideSubMenuStyling}
      className="w-full text-white"
      style={{ height: `calc(100% - ${sizes.taskbar.height})` }}
    />
  );
};

export default MonacoEditor;
