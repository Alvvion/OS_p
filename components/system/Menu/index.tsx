import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Position } from "react-rnd";

import { useMenu } from "@/context/Menu";
import { useTheme } from "@/context/Theme";
import { animateContextMenu } from "@/utils/animate";
import { ONE_TIME_PASSIVE_EVENT, PREVENT_SCROLL } from "@/utils/constants";

import MenuItemEntry from "./MenuItemEntry";
import type { MenuProps } from "./types";

const Menu: React.FC<MenuProps> = ({ subMenu }) => {
  const { menu: baseMenu = {}, setMenu } = useMenu();
  const { items, x = 0, y = 0 } = subMenu || baseMenu;
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLElement | null>(null);
  const {
    colors: {
      contextMenu: { boxShadow },
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

        const menuUnfocused = ({
          relatedTarget,
          type,
        }: MouseEvent | FocusEvent): void => {
          if (
            !(relatedTarget instanceof HTMLElement) ||
            !menuRef.current?.contains(relatedTarget)
          ) {
            resetMenu();
          }
          focusedElement.removeEventListener(
            type === "click" ? "blur" : "click",
            menuUnfocused,
          );
        };

        focusedElement.addEventListener("click", menuUnfocused, options);
        focusedElement.addEventListener("blur", menuUnfocused, options);
      } else {
        menuRef.current?.focus(PREVENT_SCROLL);
      }
    }
  }, [items, resetMenu, subMenu]);

  useEffect(() => {
    const {
      height = 0,
      width = 0,
      x: menuX = 0,
      y: menuY = 0,
    } = menuRef.current?.getBoundingClientRect() || {};
    const { height: screenHeight, width: screenWidth } = window.screen;
    const bottomOffset = y + height > screenHeight ? screenHeight - y : 0;
    const subMenuOffscreenX = Boolean(subMenu) && menuX + width > screenWidth;
    const subMenuOffscreenY = Boolean(subMenu) && menuY + height > screenHeight;

    setOffset({
      x:
        Math.round(Math.max(0, x + width - screenWidth)) +
        (subMenuOffscreenX ? Math.round(width + (subMenu?.x || 0)) : 0),
      y:
        Math.round(Math.max(0, y + height - (screenHeight - bottomOffset))) +
        (subMenuOffscreenY ? Math.round(height + (subMenu?.y || 0)) : 0),
    });
  }, [subMenu, x, y]);

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
