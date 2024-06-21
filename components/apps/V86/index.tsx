import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";

import useV86 from "./useV86";

const V86: React.FC<ComponentProps> = ({ id }) => (
  <AppContianer id={id} useHook={useV86}>
    <div
      style={{
        fontFamily: "Liberation Mono, DejaVu Sans Mono, Courier New, monospace",
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "normal",
      }}
      className="whitespace-pre"
    />
    <canvas className="bg-[#000]" />
  </AppContianer>
);

export default V86;
