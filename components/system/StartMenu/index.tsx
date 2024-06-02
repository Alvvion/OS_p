import { useCallback, useEffect, useRef } from "react";

import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

const StartMenu: React.FC = () => {
  const { toggleStartMenu } = useSession();
  const menuRef = useRef<HTMLElement | null>(null);
  const {
    currentTheme: {
      sizes: {
        taskbar: { height },
      },
    },
  } = useTheme();

  const maybeCloseMenu = useCallback(
    ({ relatedTarget }) => {
      if (
        ![relatedTarget, relatedTarget?.parentElement].includes(
          menuRef.current?.nextSibling
        )
      ) {
        toggleStartMenu(false);
      } else {
        menuRef?.current?.focus();
      }
    },
    [toggleStartMenu]
  );

  useEffect(() => menuRef?.current?.focus(), []);

  return (
    <nav
      className="absolute backdrop-blur-[10px] left-0 h-[390px] w-[320px] z-[9999] bg-startmenu"
      ref={menuRef}
      tabIndex={-1}
      onBlur={maybeCloseMenu}
      style={{ bottom: height }}
    />
  );
};

export default StartMenu;
