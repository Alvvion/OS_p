export type MenuItem = {
  action?: () => void;
  disabled?: boolean;
  icon?: string;
  label?: string;
  menu?: MenuItem[];
  primary?: boolean;
  separator?: boolean;
  toggle?: boolean;
};

export type MenuState = {
  items?: MenuItem[];
  x?: number;
  y?: number;
};

export type MenuContextType = {
  menu: MenuState;
  setMenu: React.Dispatch<React.SetStateAction<MenuState>>;
  contextMenu: (items: MenuItem[]) => React.MouseEventHandler;
};
