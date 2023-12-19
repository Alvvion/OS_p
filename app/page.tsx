import WindowManager from "@/components/system/WindowManager";
import { ProcessProvider } from "@/contexts/process";

export default function Home() {
  return (
    <ProcessProvider>
      <WindowManager />
    </ProcessProvider>
  );
}
