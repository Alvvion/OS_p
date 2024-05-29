"use client";

import Desktop from "@/components/system/Desktop";
import FileManager from "@/components/system/FileManager";
import ProcessLoader from "@/components/system/Window/ProcessLoader";
import Taskbar from "@/components/system/Window/Taskbar";
import { FileSystemProvider } from "@/context/FileSystem";
import { MenuProvider } from "@/context/Menu";
import { ProcessProvider } from "@/context/Process";
import { SessionProvider } from "@/context/Session";
import { ThemeProvider } from "@/context/Theme";

export default function Home() {
  return (
    <FileSystemProvider>
      <SessionProvider>
        <ThemeProvider>
          <MenuProvider>
            <Desktop>
              <ProcessProvider>
                <FileManager directory="/desktop" />
                <Taskbar />
                <ProcessLoader />
              </ProcessProvider>
            </Desktop>
          </MenuProvider>
        </ThemeProvider>
      </SessionProvider>
    </FileSystemProvider>
  );
}
