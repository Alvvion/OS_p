import { useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";

import { useSession } from "@/context/Session";

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { startMenuVisible } = useSession();

  useEffect(() => searchRef?.current?.focus(), [startMenuVisible]);

  return (
    <div
      className="w-[90%] flex items-center mt-6 bg-[#202020]
  rounded-full border border-[#333333]"
      ref={searchRef}
    >
      <IoMdSearch className="fill-[#F6F6F6] ml-3" size={20} />
      <input
        type="text"
        className="w-full items-center placeholder:text-[##929292] bg-inherit text-sm indent-2 h-7 mr-2 border-none focus:outline-none text-white"
        placeholder="Search for apps, settings and documents"
      />
    </div>
  );
};

export default SearchBar;
