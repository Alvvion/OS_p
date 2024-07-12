"use client";

import DesktopComponent from "@/components/common/DesktopComponent";
import { FileSystemProvider } from "@/context/FileSystem";
import { MenuProvider } from "@/context/Menu";
import { ProcessProvider } from "@/context/Process";
import { SessionProvider } from "@/context/Session";
import { ThemeProvider } from "@/context/Theme";

export default function Home(): JSX.Element {
  return (
    <FileSystemProvider>
      <SessionProvider>
        <ProcessProvider>
          <ThemeProvider>
            <MenuProvider>
              <DesktopComponent />
            </MenuProvider>
          </ThemeProvider>
        </ProcessProvider>
      </SessionProvider>
    </FileSystemProvider>
  );
}
