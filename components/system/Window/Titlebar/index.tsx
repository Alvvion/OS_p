import { useProcesses } from "@/contexts/process";
import { StyledTitlebar } from "@/styles/components/system/StyledTitlebar";
import type { TitlebarProps } from "@/types/components/system/Window";

import WindowActionButton from "./WindowActionButton";

const Titlebar: React.FC<TitlebarProps> = ({ id, bar = "Default" }) => {
  const {
    processes: {
      [id]: { icon, title },
    },
  } = useProcesses();

  return (
    <StyledTitlebar className="handle">
      <h1>
        <figure>
          <img src={icon} alt={title} />
          <figcaption>{title}</figcaption>
        </figure>
      </h1>
      <WindowActionButton id={id} />
    </StyledTitlebar>
  );
};

export default Titlebar;
