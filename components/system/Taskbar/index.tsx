import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";
import { TbBattery4 } from "react-icons/tb";

import { useProcesses } from "@/contexts/process";
import {
  StyledInnerContainer,
  StyledLanguageButton,
  StyledSearch,
  StyledSearchContainer,
  StyledSideMenu,
  StyledTaskbar,
  StyledTaskbarEntries,
  StyledTaskButtons,
} from "@/styles/components/system/StyledTaskbar";

import Clock from "./Clock";
import TaskbarButtons from "./TaskbarButtons";

const Taskbar = () => {
  const { openProcess, processes, pinnedProcesses, minimize } = useProcesses();

  const isBottomNotch = useCallback(
    (id: string) => {
      if (Object.keys(processes).includes(id)) {
        if (processes[id].minimized) {
          return "minimized";
        }
        return "true";
      }
      return "false";
    },
    [processes]
  );

  const onButtonClick = useCallback(
    (id: string) => {
      if (Object.keys(processes).includes(id)) {
        return () => minimize(id);
      }
      return () => openProcess(id);
    },
    [processes, minimize, openProcess]
  );

  return (
    <StyledTaskbar>
      <div />
      <StyledInnerContainer>
        <TaskbarButtons
          src="/assets/windows11.png"
          width={32}
          height={32}
          name="Start Button"
        />
        <StyledSearchContainer>
          <Image
            priority
            src="/assets/search.png"
            width={22}
            height={22}
            alt="Search"
          />
          <StyledSearch placeholder="Search" type="text" />
        </StyledSearchContainer>
        <StyledTaskbarEntries>
          {Object.entries(pinnedProcesses).map(([id, process]) => (
            <TaskbarButtons
              key={id}
              src={process.icon}
              width={32}
              height={32}
              name={id}
              onClick={onButtonClick(id)}
              bottomnotch={isBottomNotch(id)}
            />
          ))}
          {Object.entries(processes).map(([id, process]) => {
            const isPinned = Object.keys(pinnedProcesses).includes(id);
            return !isPinned ? (
              <TaskbarButtons
                key={id}
                src={process.icon}
                width={32}
                height={32}
                name={id}
                onClick={onButtonClick(id)}
                bottomnotch={isBottomNotch(id)}
              />
            ) : null;
          })}
        </StyledTaskbarEntries>
      </StyledInnerContainer>
      <StyledSideMenu>
        <StyledLanguageButton>
          <span>ENG</span>
          <span>IN</span>
        </StyledLanguageButton>
        <StyledTaskButtons>
          <AiOutlineWifi size={19} />
          <GiSpeaker size={19} />
          <TbBattery4 size={19} />
        </StyledTaskButtons>
        <Clock />
      </StyledSideMenu>
    </StyledTaskbar>
  );
};

export default Taskbar;
