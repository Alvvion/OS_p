import { useRef } from "react";

import { useTheme } from "@/context/Theme";
import type { ChildrenProp } from "@/types/common";

import useWallpaper from "./useWallpaper";

const Desktop: React.FC<ChildrenProp> = ({ children }) => {
  const desktopRef = useRef<HTMLElement>(null);

  const { currentTheme } = useTheme();
  useWallpaper(desktopRef);
  return (
    <main
      className={`overflow-hidden h-[100vh] w-[100vw] absolute top-0 left-0 right-0 bottom-0 bg-[${currentTheme.colors.desktopBgColor}]`}
      ref={desktopRef}
    >
      {children}
    </main>
  );
};

export default Desktop;
