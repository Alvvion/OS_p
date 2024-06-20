import type { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  extraStyles,
  children,
  ...restProps
}) => (
  <button
    type="button"
    className={`${extraStyles} cursor-context-menu`}
    onKeyDown={(event) => {
      if (!(event.target instanceof HTMLInputElement)) event?.preventDefault();
    }}
    {...restProps}
  >
    {children}
  </button>
);

export default Button;
