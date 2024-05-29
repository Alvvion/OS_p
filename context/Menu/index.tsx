import Menu from "@/components/system/Menu";

import contextFactory from "../Context Factory";
import { initialMenuState } from "../Context Factory/initialContextStates";
import type { MenuContextType } from "./types";
import useMenuContextState from "./useMenuContextState";

const { Provider, useContext } = contextFactory<MenuContextType>(
  initialMenuState,
  useMenuContextState,
  Menu
);

export { Provider as MenuProvider, useContext as useMenu };
