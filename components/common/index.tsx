import { memo, useEffect } from "react";

import { cleanUpBufferUrl } from "@/utils/functions";

import type { ButtonProps, ImageProps } from "./types";

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

export const Icon = memo(IconComponent);

export const Button: React.FC<ButtonProps> = ({
  extraStyles,
  children,
  ...restProps
}) => (
  <button
    type="button"
    className={`${extraStyles} cursor-context-menu`}
    onKeyUp={(event) => event?.preventDefault()}
    {...restProps}
  >
    {children}
  </button>
);
