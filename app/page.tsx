"use client";

import StyledApp from "@/components/pages/StyledApp";
import Desktop from "@/components/system/Desktop";
import FileManager from "@/components/system/FileManager";
import ProcessLoader from "@/components/system/ProcessLoader";
import Taskbar from "@/components/system/Taskbar";
import { FileSystemProvider } from "@/contexts/fileSystem";
import { ProcessProvider } from "@/contexts/process";
import { SessionProvider } from "@/contexts/sessions";

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
