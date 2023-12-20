"use client";

import StyledApp from "@/components/pages/StyledApp";
import ProcessLoader from "@/components/system/ProcessLoader";
import { ProcessProvider } from "@/contexts/process";
import { SessionProvider } from "@/contexts/sessions";
import themes from "@/styles/themes.json";

export default function Home() {
  return (
    <SessionProvider>
      <StyledApp currentTheme={themes.default}>
        <ProcessProvider>
          <ProcessLoader />
        </ProcessProvider>
      </StyledApp>
    </SessionProvider>
  );
}
