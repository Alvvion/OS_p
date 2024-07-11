import type { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  extraStyles,
  ref,
  children,
  ...restProps
}) => (
  <button
    type="button"
    ref={ref}
    className={`${extraStyles} cursor-context-menu`}
    onKeyDown={(event) => {
      if (!(event.target instanceof HTMLTextAreaElement))
        event.preventDefault();
    }}
    {...restProps}
  >
    {children}
  </button>
);

export default Button;
