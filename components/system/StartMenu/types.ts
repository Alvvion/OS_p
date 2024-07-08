export type MaybeCloseMenu = (
  event: React.FocusEvent<HTMLElement>,
  menuElement: HTMLElement | null,
  toggleMenu: (toggle?: boolean) => void,
  focusElement: HTMLElement | null,
  buttonTitle?: string,
  closeOnTaskbarEntry?: boolean,
) => void;

export type StartMenuProps = {
  toggleStartMenu: (showMenu?: boolean) => void;
};
