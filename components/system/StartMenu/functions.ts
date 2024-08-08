import type { MaybeCloseMenu } from "./types";

const PREVENT_SCROLL = { preventScroll: true };

// eslint-disable-next-line import/prefer-default-export
export const maybeCloseMenu: MaybeCloseMenu = (
  { relatedTarget: focusedElement },
  menuElement,
  toggleMenu,
  focusElement,
  buttonTitle,
  closeOnTaskbarEntries = false,
) => {
  const focusedInsideMenu =
    focusedElement && menuElement?.contains(focusedElement);

  if (!focusedInsideMenu) {
    const taskbarElement = menuElement?.nextSibling;
    const focusedTaskbarEntries = focusedElement === taskbarElement;
    const focusedTaskbarButton =
      focusedElement?.parentElement === taskbarElement;
    const focusedOnSelfButton =
      (focusedElement as HTMLElement)?.title === buttonTitle;

    if (
      focusedElement &&
      ((closeOnTaskbarEntries && focusedTaskbarEntries) ||
        (!focusedTaskbarEntries &&
          (!focusedTaskbarButton || !focusedOnSelfButton)))
    ) {
      toggleMenu(false);
    } else {
      (focusElement || menuElement)?.focus(PREVENT_SCROLL);
    }
  }
};
