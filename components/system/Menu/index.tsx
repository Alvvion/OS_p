import { useEffect, useRef } from "react";

import { useMenu } from "@/context/Menu";
import { useTheme } from "@/context/Theme";

import MenuItemEntry from "./MenuItemEntry";
import type { MenuProps } from "./types";

const Menu: React.FC<MenuProps> = ({ subMenu }) => {
  const { menu: baseMenu = {}, setMenu } = useMenu();
  const { items, x = 0, y = 0 } = subMenu || baseMenu;
  const menuRef = useRef<HTMLElement | null>(null);
  const {
    currentTheme: {
      colors: {
        contextMenu: { boxShadow },
      },
    },
  } = useTheme();

  const resetMenu = ({
    relatedTarget,
  }: Partial<FocusEvent | MouseEvent> = {}) => {
    if (!menuRef.current?.contains(relatedTarget as HTMLElement)) {
      setMenu({});
    }
  };

  useEffect(() => {
    if (items && !subMenu) menuRef?.current?.focus();
  }, [items, subMenu]);

  return items ? (
    <nav
      className={`bg-context-background border-context-border border text-white h-fit py-1 px-0.5 w-fit absolute text-xs ${
        subMenu ? "z-[11]" : "z-10"
      }`}
      onBlur={resetMenu}
      ref={menuRef}
      tabIndex={-1}
      style={{ transform: `translate(${x}px, ${y}px)`, boxShadow }}
    >
      <ol>
        {items.map((item) => (
          <MenuItemEntry
            key={item.label || item.separator}
            resetMenu={resetMenu}
            {...item}
          />
        ))}
      </ol>
    </nav>
  ) : undefined;
};

export default Menu;
