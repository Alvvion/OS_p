import { useRef } from "react";

import useWallpaper from "@/hooks/useWallpaper";
import StyledDesktop from "@/styles/components/system/StyledDesktop";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const Desktop: React.FC<ChildrenProp> = ({ children }) => {
  const desktopRef = useRef<HTMLElement>(null);

  useWallpaper(desktopRef);

  return <StyledDesktop ref={desktopRef}>{children}</StyledDesktop>;
};

export default Desktop;
