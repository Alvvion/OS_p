import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";
import { TbBattery4 } from "react-icons/tb";

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
import TaskbarEntry from "./TaskbarEntry";

const Taskbar = () => (
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
        <Image src="/assets/search.png" width={22} height={22} alt="Search" />
        <StyledSearch placeholder="Search" type="text" />
      </StyledSearchContainer>
      <StyledTaskbarEntries>
        <TaskbarEntry />
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

export default Taskbar;
