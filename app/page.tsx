"use client";

import StyledApp from "@/components/pages/StyledApp";
import Desktop from "@/components/system/Desktop";
import FileManager from "@/components/system/FIleManager";
import ProcessLoader from "@/components/system/Window/ProcessLoader";
import Taskbar from "@/components/system/Taskbar";
import { FileSystemProvider } from "@/contexts/fileSystem";
import { ProcessProvider } from "@/contexts/process";
import { SessionProvider } from "@/contexts/session";

export default function Home() {
  return (
    <FileSystemProvider>
      <SessionProvider>
        <StyledApp>
          <Desktop>
            <ProcessProvider>
              <FileManager directory="/desktop" />
              <Taskbar />
              <ProcessLoader />
            </ProcessProvider>
          </Desktop>
        </StyledApp>
      </SessionProvider>
    </FileSystemProvider>
  );
}
