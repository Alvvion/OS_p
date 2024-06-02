export type MaybeCloseMenu = (
  event: React.FocusEvent<HTMLElement>,
  menuElement: HTMLElement | null,
  toggleMenu: (toggle?: boolean) => void,
  focusElement: HTMLElement | null,
  buttonTitle?: string,
  closeOnTaskbarEntry?: boolean
) => void;