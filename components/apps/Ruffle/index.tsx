import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";

import useRuffle from "./useRuffle";

const Ruffle: React.FC<ComponentProps> = ({ id }) => (
  <AppContianer
    id={id}
    useHook={useRuffle}
    className="[&_canvas]:h-full [&_canvas]:w-full"
  />
);

export default Ruffle;
