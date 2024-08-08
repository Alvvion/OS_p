import { IoPower } from "react-icons/io5";

import Button from "@/components/common/Button";
import { Avatar } from "@/components/common/Icons";
import { useFileSystem } from "@/context/FileSystem";

const Footer: React.FC = () => {
  const { resetFs } = useFileSystem();

  return (
    <footer className="w-full bg-[#1C1C1C] h-14">
      <div className="w-[90%] h-full m-auto flex justify-between items-center">
        <Avatar extraStyles="bg-slate-500" />
        <Button
          extraStyles="p-2 hover:bg-[#313131] flex justify-center rounded-md"
          onClick={() => resetFs()?.finally(() => window.location.reload())}
        >
          <IoPower className="fill-white" size={22} />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
