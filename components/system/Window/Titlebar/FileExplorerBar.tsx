import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import {
  AddTabsButton,
  StyledTab,
} from "@/styles/components/system/StyledWindow";
import type { WinExplorerTitlebarProps } from "@/types/components/system/Window";

const WinExplorerTabs: React.FC<WinExplorerTitlebarProps> = ({
  icon,
  title,
}) => (
  <StyledTab>
    <figure>
      <img src={icon} alt={title} />
      <figcaption>{title}</figcaption>
    </figure>
    <button type="button">
      <IoMdClose />
    </button>
  </StyledTab>
);

const WinExplorerTitlebar: React.FC<WinExplorerTitlebarProps> = ({
  icon,
  title,
}) => (
  <>
    <WinExplorerTabs icon={icon} title={title} />
    <AddTabsButton>
      <FaPlus />
    </AddTabsButton>
  </>
);

export default WinExplorerTitlebar;
