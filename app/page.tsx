"use client";

import StyledApp from "@/components/pages/StyledApp";
import ProcessLoader from "@/components/system/ProcessLoader";
import { ProcessProvider } from "@/contexts/process";
import { SessionProvider } from "@/contexts/sessions";

export default function Home() {
  return (
    <SessionProvider>
      <StyledApp>
        <ProcessProvider>
          <ProcessLoader />
        </ProcessProvider>
      </StyledApp>
    </SessionProvider>
  );
}
