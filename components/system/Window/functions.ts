// eslint-disable-next-line import/prefer-default-export
export const reRouteFoucs =
  (focusElement: HTMLElement) =>
  (element?: Element): void => {
    element?.setAttribute("tabindex", "-1");
    element?.addEventListener("mousedown", (event) => {
      event.preventDefault();
      focusElement?.focus();
    });
  };
