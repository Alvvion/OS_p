import { useCallback, useState } from "react";

import type { MenuContextType, MenuItem, MenuState } from "./types";

const useMenuContextState = (): MenuContextType => {
  const [menu, setMenu] = useState<MenuState>({});

  const contextMenu = useCallback(
    (items: MenuItem[]): React.MouseEventHandler =>
      (event) => {
        event.preventDefault();
        const { pageX: x, pageY: y } = event;
        setMenu({ items, x, y });
      },
    []
  );

  return { menu, setMenu, contextMenu };
};

export default useMenuContextState;
