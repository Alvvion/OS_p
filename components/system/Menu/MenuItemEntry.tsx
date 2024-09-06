/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useRef, useState } from "react";
import type { Position } from "react-rnd";

import Icon from "@/components/common/Icon";
import { ChevronRight, Circle } from "@/components/common/Icons";
import { useTheme } from "@/context/Theme";

import Menu from ".";
import type { MenuItemProps } from "./types";

const MenuItemEntry: React.FC<MenuItemProps> = ({
  resetMenu,
  action,
  disabled,
  icon,
  label,
  menu,
  primary,
  separator,
  toggle,
}) => {
  const entryRef = useRef<HTMLLIElement | null>(null);
  const [subMenuOffset, setSubMenuOffset] = useState<Position>({ x: 0, y: 0 });
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { sizes } = useTheme();
  const onMouseEnter: React.MouseEventHandler = () => setShowSubMenu(true);
  const onMouseLeave: React.MouseEventHandler = ({ relatedTarget }) => {
    if (
      !(relatedTarget instanceof HTMLElement) ||
      !entryRef.current?.contains(relatedTarget)
    ) {
      setShowSubMenu(false);
    }
  };
  const subMenuEvents = menu ? { onMouseEnter, onMouseLeave } : {};

  useEffect(() => {
    if (menu && entryRef.current) {
      const { height, width } = entryRef.current.getBoundingClientRect();

      setSubMenuOffset({
        x: width - sizes.contextMenu.subMenuOffset,
        y: -height - sizes.contextMenu.subMenuOffset,
      });
    }
  }, [menu, sizes.contextMenu.subMenuOffset]);

  return (
    <li
      ref={entryRef}
      className={`${disabled ? "text-[#6E6E6E] pointer-events-none" : ""}`}
      {...subMenuEvents}
    >
      {separator ? (
        <hr className="bg-context-sperator h-px my-[3px] mx-2" />
      ) : (
        <figure
          onClick={() => {
            if (!menu && !disabled) {
              action?.();
              resetMenu();
            }
          }}
          className={`flex py-[3px] hover:bg-context-fig-hover ${
            showSubMenu ? "bg-context-fig-hover" : ""
          }`}
        >
          {icon && (
            <Icon className="-mr-6 ml-2" src={icon} alt={label} size={16} />
          )}
          {toggle && (
            <Circle extraStyles="h-[13px] absolute w-[13px] left-2 mt-px" />
          )}
          <figcaption
            className={`relative ml-8 mr-16 -top-px w-max text-nowrap ${
              primary ? "font-semibold" : ""
            }`}
          >
            {label}
          </figcaption>
          {menu && (
            <ChevronRight extraStyles="fill-white h-3 mt-px absolute right-2 w-3" />
          )}
        </figure>
      )}
      {showSubMenu && <Menu subMenu={{ items: menu, ...subMenuOffset }} />}
    </li>
  );
};

export default MenuItemEntry;
