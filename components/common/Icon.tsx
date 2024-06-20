import { memo, useEffect } from "react";

import { cleanUpBufferUrl } from "@/utils/functions";

import type { ImageProps } from "./types";

const onLoad: React.ReactEventHandler<HTMLImageElement> = ({ target }) =>
  (target as HTMLImageElement).style.setProperty("visibility", "visible");

const IconComponent: React.FC<ImageProps> = ({
  size,
  src,
  visibility,
  className,
  ...restProps
}) => {
  useEffect(
    () => () => {
      if (src?.startsWith("blob:")) cleanUpBufferUrl(src);
    },
    [src]
  );

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      draggable={false}
      onLoad={onLoad}
      height={size}
      width={size}
      src={src}
      className={`${className} ${visibility ? "" : "invisible"}`}
      {...restProps}
    />
  );
};

const Icon = memo(IconComponent);

export default Icon;
