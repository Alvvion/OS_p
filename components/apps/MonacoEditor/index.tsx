import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";

import { overrideSubMenuStyling } from "./functions";
import useMonaco from "./useMonaco";

const MonacoEditor: React.FC<ComponentProps> = ({ id }) => (
  <AppContianer
    id={id}
    useHook={useMonaco}
    onBlur={overrideSubMenuStyling}
    className="w-full text-white h-full"
  />
);

export default MonacoEditor;
