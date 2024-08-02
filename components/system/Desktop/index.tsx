import { useRef } from "react";

import type { ChildrenProp } from "@/components/common/types";
import { useTheme } from "@/context/Theme";

import FileManager from "../FileManager";
import useWallpaper from "./useWallpaper";

const Desktop: React.FC<ChildrenProp> = ({ children }) => {
  const desktopRef = useRef<HTMLElement>(null);

  const { colors } = useTheme();
  useWallpaper(desktopRef);
  return (
    <main
      className={`overflow-hidden h-[100vh] w-[100vw] bg-center absolute inset-0 bg-[${colors.desktopBgColor}] [&>ol]:pb-6
      `}
      ref={desktopRef}
    >
      <FileManager url="/Users/Public/Desktop" hideLoading scrollable={false} />
      {children}
    </main>
  );
};

export default Desktop;
