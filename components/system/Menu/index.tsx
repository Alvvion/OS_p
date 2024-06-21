import { useEffect, useRef, useState } from "react";
import type { Position } from "react-rnd";

import { useMenu } from "@/context/Menu";
import { useTheme } from "@/context/Theme";
import { pxToNumber } from "@/utils/functions";

import MenuItemEntry from "./MenuItemEntry";
import type { MenuProps } from "./types";

const Menu: React.FC<MenuProps> = ({ subMenu }) => {
  const { menu: baseMenu = {}, setMenu } = useMenu();
  const { items, x = 0, y = 0 } = subMenu || baseMenu;
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLElement | null>(null);
  const {
    currentTheme: {
      colors: {
        contextMenu: { boxShadow },
      },
      sizes: { taskbar },
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

  useEffect(() => {
    const { height = 0, width = 0 } =
      menuRef.current?.getBoundingClientRect() || {};
    const { innerHeight, innerWidth } = window;

    setOffset({
      x: Math.round(Math.max(0, x + width - innerWidth)),
      y: Math.round(
        Math.max(0, y + height - (innerHeight - pxToNumber(taskbar.height)))
      ),
    });
  }, [taskbar.height, x, y]);

  return items ? (
    <nav
      className={`bg-context-background border-context-border border text-white h-fit py-1 px-0.5 w-fit absolute text-xs ${
        subMenu ? "z-[11]" : "z-10"
      }`}
      onBlurCapture={resetMenu}
      ref={menuRef}
      tabIndex={-1}
      style={{
        transform: `translate(${x - offset.x}px, ${y - offset.y}px)`,
        boxShadow,
      }}
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
