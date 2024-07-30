import Desktop from "@/components/system/Desktop";
import FileManager from "@/components/system/FileManager";
import Taskbar from "@/components/system/Taskbar";
import ProcessLoader from "@/components/system/Window/ProcessLoader";
import useIFrameFocuser from "@/hooks/useIFrameFocuser";
import useUrlLoader from "@/hooks/useUrlLoader";

const DesktopComponent: React.FC = () => {
  useIFrameFocuser();
  useUrlLoader();
  return (
    <Desktop>
      <FileManager url="/Users/Public/Desktop" hideLoading scrollable={false} />
      <Taskbar />
      <ProcessLoader />
    </Desktop>
  );
};

export default DesktopComponent;
