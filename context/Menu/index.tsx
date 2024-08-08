import Menu from "@/components/system/Menu";

import contextFactory from "../Context Factory";
import type { MenuContextType } from "./types";
import useMenuContextState from "./useMenuContextState";

const { Provider, useContext } = contextFactory<MenuContextType>(
  useMenuContextState,
  () => <Menu />,
);

export { Provider as MenuProvider, useContext as useMenu };
