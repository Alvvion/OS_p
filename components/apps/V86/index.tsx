import { useRef } from "react";

// eslint-disable-next-line import/no-cycle
import { useProcesses } from "@/contexts/process";
import useV86 from "@/hooks/useV86";
import useV86ScreenSize from "@/hooks/useV86ScreenSize";
import { StyledV86 } from "@/styles/components/apps/V86";

const V86 = ({ id }: { id: string }): React.JSX.Element => {
  const {
    processes: {
      [id]: { url = "" },
    },
  } = useProcesses();
  const screenRef = useRef<HTMLDivElement | null>(null);
  const { emulator, lockMouse } = useV86(url, screenRef);

  const textStyle = useV86ScreenSize(emulator, id);

  return (
    <StyledV86 ref={screenRef} onClick={lockMouse}>
      <div style={textStyle} />
      <canvas />
    </StyledV86>
  );
};

export default V86;