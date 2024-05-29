/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from "@/components/common";
import type { MenuItem } from "@/context/Menu/types";

type MenuItemProps = MenuItem & {
  resetMenu: () => void;
};

const MenuItemEntry: React.FC<MenuItemProps> = ({
  resetMenu,
  action,
  icon,
  label,
  primary,
  separator,
}) => (
  <li>
    {separator ? (
      <hr className="bg-context-sperator h-px my-[3px] mx-2" />
    ) : (
      <figure
        onClick={() => {
          action?.();
          resetMenu();
        }}
        className="flex py-[3px] hover:bg-context-fig-hover"
      >
        {icon && (
          <Icon className="-mr-6 ml-2" src={icon} alt={label} size={16} />
        )}
        <figcaption
          className={`relative ml-8 mr-16 -top-px ${
            primary ? "font-semibold" : ""
          }`}
        >
          {label}
        </figcaption>
      </figure>
    )}
  </li>
);

export default MenuItemEntry;
