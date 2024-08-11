import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";
import { haltEvent } from "@/context/FileSystem/functions";

import useSpaceCadet from "./useSpaceCadet";

const SpaceCadet: React.FC<ComponentProps> = ({ id }) => (
  <AppContianer id={id} useHook={useSpaceCadet} className="h-full">
    <canvas id="canvas" onContextMenu={haltEvent} className="h-full w-full" />
  </AppContianer>
);

export default SpaceCadet;
