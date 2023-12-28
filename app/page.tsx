"use client";

import StyledApp from "@/components/pages/StyledApp";
import Desktop from "@/components/system/Desktop";
import ProcessLoader from "@/components/system/ProcessLoader";
import { ProcessProvider } from "@/contexts/process";
import { SessionProvider } from "@/contexts/sessions";

export default function Home() {
  return (
    <SessionProvider>
      <StyledApp>
        <Desktop>
          <ProcessProvider>
            <ProcessLoader />
          </ProcessProvider>
        </Desktop>
      </StyledApp>
    </SessionProvider>
  );
}
