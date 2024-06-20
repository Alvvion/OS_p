import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";

import useJSDOS from "./useJSDOS";

const JSDOS: React.FC<ComponentProps> = ({ id }) => (
  <AppContianer
    id={id}
    useHook={useJSDOS}
    className="bg-black w-full !h-full [&_canvas]:!top-0 [&_canvas]:w-full [&_div]:hidden [&_video]:hidden [&_canvas]:[image-rendering:pixelated] flex place-items-center"
  />
);

export default JSDOS;
