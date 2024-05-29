import { cleanUpBufferUrl } from "@/utils/functions";

import type { ButtonProps, ImageProps } from "./types";

const onLoad: React.ReactEventHandler<HTMLImageElement> = ({ target }) => {
  const img = target as HTMLImageElement;

  img.style.setProperty("visibility", "visible");

  if (img.src.startsWith("blob:")) cleanUpBufferUrl(img.src);
};

export const Icon: React.FC<ImageProps> = ({ size, ...restProps }) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img
    draggable={false}
    onLoad={onLoad}
    height={size}
    width={size}
    {...restProps}
  />
);

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
