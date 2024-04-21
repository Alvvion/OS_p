import { cleanUpBufferUrl } from "@/utils/functions";

import type { ButtonProps, ImageProps } from "./types";

const onLoad: React.ReactEventHandler<HTMLImageElement> = ({ target }) => {
  const img = target as HTMLImageElement;

  img.style.setProperty("visibility", "visible");

  if (img.src.startsWith("blob:")) cleanUpBufferUrl(img.src);
};

export const Image: React.FC<ImageProps> = ({ ...restProps }) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img draggable={false} onLoad={onLoad} {...restProps} />
);

export const Button: React.FC<ButtonProps> = ({
  extraStyles,
  children,
  ...restProps
}) => (
  <button
    type="button"
    className={`${extraStyles} w-full cursor-context-menu`}
    {...restProps}
  >
    {children}
  </button>
);
