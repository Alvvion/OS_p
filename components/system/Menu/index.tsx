import { useEffect, useRef } from "react";

import { useMenu } from "@/context/Menu";
import { useTheme } from "@/context/Theme";

import MenuItemEntry from "./MenuItemEntry";

const Menu: React.FC = () => {
  const { menu: { items, x = 0, y = 0 } = {}, setMenu } = useMenu();
  const resetMenu = () => setMenu({});
  const menuRef = useRef<HTMLElement | null>(null);
  const {
    currentTheme: {
      colors: {
        contextMenu: { boxShadow },
      },
    },
  } = useTheme();

  useEffect(() => {
    if (items) menuRef?.current?.focus();
  }, [items]);

  return items ? (
    <nav
      className="bg-context-background border-context-border border text-white h-fit py-1 px-0.5 w-fit absolute text-xs z-50"
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
  ) : null;
};

export default Menu;
