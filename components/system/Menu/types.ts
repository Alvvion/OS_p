import type { MenuItem, MenuState } from "@/context/Menu/types";

export type MenuItemProps = MenuItem & {
  resetMenu: () => void;
};

export type MenuProps = {
  subMenu?: MenuState;
};

export type ContextMenu = {
  onContextMenuCapture: React.MouseEventHandler<HTMLElement>;
};
