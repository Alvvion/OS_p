import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { useSession } from "@/context/Session";
import { animateStartMenu } from "@/utils/animate";

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
    <motion.nav
      className="md:[--height:660px] lg:[--height:680px] md:[--width:560px] lg:[--width:605px] absolute backdrop-blur-[10px] h-[390px] w-[320px] z-[1000] bg-startmenu left-2 bottom-14 rounded-lg border-[1.5px] border-[#454545] md:h-[660px] md:w-[560px] lg:h-[680px] lg:w-[605px] flex flex-col justify-between overflow-hidden"
      ref={menuRef}
      tabIndex={-1}
      onBlur={maybeCloseMenu}
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
