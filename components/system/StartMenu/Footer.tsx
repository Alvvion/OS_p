import { IoPower } from "react-icons/io5";

import { Avatar } from "@/components/system/Window/Titlebar/Icons";

const Footer = () => (
  <footer className="w-full bg-[#1C1C1C] h-14">
    <div className="w-[90%] h-full m-auto flex justify-between items-center">
      <Avatar extraStyles="bg-slate-500" />
      <IoPower className="fill-white" size={22} />
    </div>
  </footer>
);

export default Footer;
