import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";

import { Button } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import type { ComponentProps } from "@/types/common";

import FileManager from "../../system/FileManager";
import type { ButtonOnNavType } from "./types";

const _tailwind = ["hover:bg-titlebar-backgroundHover"];

const FileExplorer: React.FC<ComponentProps> = ({ id }) => {
  const {
    processes: {
      [id]: { url },
    },
    title,
  } = useProcesses();

  const {
    currentTheme: {
      sizes: {
        fileExplorer: { height },
      },
      colors: {
        titlebar: { backgroundHover, text },
      },
    },
  } = useTheme();

  const buttonsOnNav: ButtonOnNavType[] = [
    {
      Component: FaArrowLeft,
      iconHover: "leftArrow",
    },
    {
      Component: FaArrowRight,
      iconHover: "rightArrow",
    },
    {
      Component: FaArrowUp,
      iconHover: "upArrow",
    },
    {
      Component: IoMdRefresh,
      iconHover: "refresh",
      size: 20,
    },
  ];

  const path = url || "/";

  useEffect(() => title(id, path), [id, path, title]);

  return (
    <>
      <header
        style={{ height }}
        className="bg-[#2C2C2C] flex flex-row border-b-[0.5px] border-b-[#3A3A3A] items-center"
      >
        {buttonsOnNav.map(({ iconHover, Component, size }) => (
          <Button
            key={iconHover}
            extraStyles={`p-2 rounded-md mt-1 ml-4 mr-1 hover:${backgroundHover}`}
          >
            <Component style={{ color: text }} size={size} />
          </Button>
        ))}
      </header>
      <FileManager directory={path} />
    </>
  );
};

export default FileExplorer;
