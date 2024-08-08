import { useProcesses } from "@/context/Process";

import Window from "./index";

const ProcessLoader: React.FC = () => {
  const { processes } = useProcesses();

  return (
    <>
      {Object.entries(processes).map(
        ([id, { Component, hasWindow = false, titlebarStyle = "Default" }]) =>
          hasWindow ? (
            <Window key={id} id={id} titlebarStyle={titlebarStyle}>
              <Component id={id} />
            </Window>
          ) : (
            <Component key={id} id={id} />
          )
      )}
    </>
  );
};

export default ProcessLoader;
