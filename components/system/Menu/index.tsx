import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Position } from "react-rnd";

import { useMenu } from "@/context/Menu";
import { useTheme } from "@/context/Theme";
import { animateContextMenu } from "@/utils/animate";
import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";
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

  const resetMenu = useCallback(
    ({ relatedTarget }: Partial<FocusEvent | MouseEvent> = {}) => {
      if (
        !(relatedTarget instanceof HTMLElement) ||
        !menuRef.current?.contains(relatedTarget)
      ) {
        setMenu({});
      }
    },
    [setMenu],
  );

  useEffect(() => {
    if (items && !subMenu) {
      const focusedElement = document.activeElement;

      if (
        focusedElement instanceof HTMLElement &&
        focusedElement !== document.body
      ) {
        const options: AddEventListenerOptions = {
          capture: true,
          ...ONE_TIME_PASSIVE_EVENT,
        };

        const menuUnfocused: EventListener = ({ type }) => {
          resetMenu();
          focusedElement.removeEventListener(
            type === "click" ? "blur" : "click",
            menuUnfocused,
          );
        };

        focusedElement.addEventListener("click", menuUnfocused, options);
        focusedElement.addEventListener("blur", menuUnfocused, options);
      } else {
        menuRef.current?.focus();
      }
    }
  }, [items, resetMenu, subMenu]);

  useEffect(() => {
    const { height = 0, width = 0 } =
      menuRef.current?.getBoundingClientRect() || {};
    const { innerHeight, innerWidth } = window;

    setOffset({
      x: Math.round(Math.max(0, x + width - innerWidth)),
      y: Math.round(
        Math.max(0, y + height - (innerHeight - pxToNumber(taskbar.height))),
      ),
    });
  }, [taskbar.height, x, y]);

  return items ? (
    <motion.nav
      className={`bg-context-background border-context-border border text-white h-fit py-1 px-0.5 w-fit absolute text-xs ${
        subMenu ? "z-[101]" : "z-[100]"
      }`}
      onBlurCapture={resetMenu}
      ref={menuRef}
      tabIndex={-1}
      style={{
        transform: `translate(${x - offset.x}px, ${y - offset.y}px)`,
        boxShadow,
      }}
      {...animateContextMenu}
    >
      <ol>
        {items.map((item, i) => (
          <MenuItemEntry
            key={item.label || i}
            resetMenu={resetMenu}
            {...item}
          />
        ))}
      </ol>
    </motion.nav>
  ) : undefined;
};

export default Menu;
