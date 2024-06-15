export type MenuItem = {
  action?: () => void;
  icon?: string;
  label?: string;
  menu?: MenuItem[];
  primary?: boolean;
  separator?: number;
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
