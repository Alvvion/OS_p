import { useEffect, useRef } from "react";

import { useSession } from "@/context/Session";

import AppBox from "./AppBox";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

const StartMenu: React.FC = () => {
  const { toggleStartMenu } = useSession();
  const menuRef = useRef<HTMLElement | null>(null);

  const maybeCloseMenu = ({ relatedTarget }: React.FocusEvent) => {
    const focusedElement = relatedTarget as HTMLElement;
    const focusedInsideMenu = menuRef.current?.contains(focusedElement);

    if (!focusedInsideMenu) {
      const focusedTaskbar = focusedElement === menuRef.current?.nextSibling;

      const focusedStartButton =
        focusedElement?.parentElement?.parentElement ===
        menuRef.current?.nextSibling;

      if (focusedTaskbar || focusedStartButton) {
        menuRef.current?.focus();
      } else toggleStartMenu(false);
    }
  };

  useEffect(() => menuRef?.current?.focus(), []);

  return (
    <nav
      className="absolute backdrop-blur-[10px] h-[390px] w-[320px] z-[9999] bg-startmenu left-2 bottom-14 rounded-lg border-[1.5px] border-[#454545] md:h-[660px] md:w-[560px] lg:h-[680px] lg:w-[605px] flex flex-col justify-between overflow-hidden"
      ref={menuRef}
      tabIndex={-1}
      onBlur={maybeCloseMenu}
    >
      <div className="flex flex-col items-center">
        <SearchBar />
        <AppBox />
      </div>
      <Footer />
    </nav>
  );
};

export default StartMenu;
