"use client";

import Desktop from "@/components/system/Desktop";
import FileManager from "@/components/system/FileManager";
import Taskbar from "@/components/system/Taskbar";
import ProcessLoader from "@/components/system/Window/ProcessLoader";
import { FileSystemProvider } from "@/context/FileSystem";
import { MenuProvider } from "@/context/Menu";
import { ProcessProvider } from "@/context/Process";
import { SessionProvider } from "@/context/Session";
import { ThemeProvider } from "@/context/Theme";
import useUrlLoader from "@/hooks/useUrlLoader";

export default function Home(): JSX.Element {
  useUrlLoader();
  return (
    <FileSystemProvider>
      <SessionProvider>
        <ThemeProvider>
          <MenuProvider>
            <Desktop>
              <ProcessProvider>
                <FileManager url="/desktop" />
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
