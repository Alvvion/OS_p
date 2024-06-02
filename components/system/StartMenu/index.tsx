import { useCallback, useEffect, useRef } from "react";

import { useSession } from "@/context/Session";

const StartMenu: React.FC = () => {
  const { toggleStartMenu } = useSession();
  const menuRef = useRef<HTMLElement | null>(null);

  const maybeCloseMenu = useCallback(
    ({ relatedTarget }: React.FocusEvent) => {
      if (
        ![
          relatedTarget,
          relatedTarget?.parentElement,
          relatedTarget?.parentElement?.parentElement,
        ].includes(menuRef.current?.nextSibling as EventTarget & Element)
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
      className="absolute backdrop-blur-[10px] h-[390px] w-[320px] z-[9999] bg-startmenu left-2 bottom-14 rounded-lg border-[1.5px] border-[#454545] md:h-[660px] md:w-[560px] lg:h-[680px] lg:w-[605px]"
      ref={menuRef}
      tabIndex={-1}
      onBlur={maybeCloseMenu}
    />
  );
};

export default StartMenu;
