import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { useSession } from "@/context/Session";
import { animateStartMenu } from "@/utils/animate";
import { PREVENT_SCROLL } from "@/utils/constants";

import AppBox from "./AppBox";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

const StartMenu: React.FC = () => {
  const { toggleStartMenu } = useSession();
  const menuRef = useRef<HTMLElement | null>(null);

  const maybeCloseMenu = ({ relatedTarget }: React.FocusEvent): void => {
    const focusedElement = relatedTarget as HTMLElement | null;
    const focusedInsideMenu =
      focusedElement && menuRef.current?.contains(focusedElement);
    if (!focusedInsideMenu) {
      const focusedTaskbar = focusedElement === menuRef.current?.nextSibling;

      const focusedStartButton =
        focusedElement?.parentElement?.parentElement ===
        menuRef.current?.nextSibling;

      if (focusedTaskbar || focusedStartButton) {
        menuRef.current?.focus(PREVENT_SCROLL);
      } else toggleStartMenu(false);
    }
  };

  useEffect(() => menuRef?.current?.focus(PREVENT_SCROLL), []);

  return (
    <motion.nav
      className="md:[--height:660px] lg:[--height:680px] md:[--width:560px] lg:[--width:605px] absolute backdrop-blur-[10px] h-[390px] w-[320px] z-40 bg-startmenu left-2 bottom-14 rounded-lg border-[1.5px] border-[#454545] md:h-[660px] md:w-[560px] lg:h-[680px] lg:w-[605px] flex flex-col justify-between overflow-hidden outline-none"
      ref={menuRef}
      tabIndex={-1}
      onBlurCapture={maybeCloseMenu}
      {...animateStartMenu}
    >
      <div className="flex flex-col items-center">
        <SearchBar />
        <AppBox />
      </div>
      <Footer />
    </motion.nav>
  );
};

export default StartMenu;
