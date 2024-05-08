import { AiOutlineWifi } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";
import { TbBattery4 } from "react-icons/tb";

import { Button, Icon } from "@/components/common";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";

import Clock from "./Clock";
import TaskbarButtons from "./TaskbarButtons";
import TaskbarEntry from "./TaskbarEntry";

const _tailwind = ["hover:bg-taskbar-button-hover"];

const Taskbar = () => {
  const { processes } = useProcesses();
  const {
    currentTheme: {
      colors: {
        taskbar: { bgColor, searchBgColor, text, buttonHover },
      },
      sizes: {
        taskbar: {
          height,
          search: {
            iconTop,
            iconLeft,
            fontSize,
            width,
            borderRadius,
            margin,
            padding,
            height: searchHeight,
          },
        },
      },
    },
  } = useTheme();

  return (
    <nav
      style={{ backgroundColor: bgColor, height }}
      className="absolute z-[1000] w-[100vw] flex flex-row justify-between items-center bottom-0 left-0 right-0"
    >
      <div />
      <div className="h-full flex place-content-center place-items-center">
        <TaskbarButtons
          src="/assets/windows11.png"
          width={32}
          height={32}
          name="Start Button"
        />
        <div className="relative h-full">
          <Icon
            src="/assets/search.png"
            width={22}
            height={22}
            alt="Search"
            className="absolute z-10"
            style={{ top: iconTop, left: iconLeft }}
          />
          <input
            style={{
              backgroundColor: searchBgColor,
              height: searchHeight,
              width,
              fontSize,
              margin,
              padding,
              borderRadius,
            }}
            placeholder="Search"
            type="text"
          />
        </div>
        <div className="flex flex-row justify-center items-center h-full relative">
          {Object.entries(processes)
            .filter(([_id, { closing }]) => !closing)
            .map(([id, process]) => (
              <TaskbarEntry
                key={id}
                src={process.icon}
                width={32}
                height={32}
                name={id}
                pid={id}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center h-[88%] py-[5px] px-[10px] rounded-md">
        <div
          className={`text-xs flex flex-col hover:${buttonHover} py-[2px] px-[10px] rounded-md border border-transparent hover:border hover:border-[#333333]`}
          style={{
            color: text,
          }}
        >
          <span className="m-px text-center">ENG</span>
          <span className="m-px text-center">IN</span>
        </div>
        <Button
          extraStyles={`rounded-md flex flex-row justify-between items-center p-3 hover:${buttonHover} border border-transparent hover:border hover:border-[#333333]`}
          style={{
            color: text,
          }}
        >
          <AiOutlineWifi className="pr-[2px]" size={19} />
          <GiSpeaker className="pr-[2px]" size={19} />
          <TbBattery4 className="pr-[2px]" size={19} />
        </Button>
        <Clock />
      </div>
    </nav>
  );
};

export default Taskbar;
