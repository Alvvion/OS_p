"use client";

import StyledApp from "@/components/pages/StyledApp";
import Desktop from "@/components/system/Desktop";
import ProcessLoader from "@/components/system/ProcessLoader";
import { ProcessProvider } from "@/contexts/process";
import { SessionProvider } from "@/contexts/sessions";
import themes from "@/styles/themes.json";
import { getStartupProcess } from "@/utils/processDir";

export default function Home() {
  return (
    <SessionProvider>
      <StyledApp currentTheme={themes.default}>
        <Desktop>
          <ProcessProvider startupProcesses={getStartupProcess()}>
            <ProcessLoader />
          </ProcessProvider>
        </Desktop>
      </StyledApp>
    </SessionProvider>
  );
}
