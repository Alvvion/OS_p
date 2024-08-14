import { basename, dirname } from "path";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/common/Button";
import {
  Back,
  Forward,
  PC,
  Refresh,
  RightArrow,
  Up,
} from "@/components/common/Icons";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import { ROOT_NAME } from "./config";
import type { NavigationProps } from "./types";

const Navigation: React.FC<NavigationProps> = ({ id }) => {
  const {
    url: changeUrl,
    processes: { [id]: process },
  } = useProcesses();
  const { url = "" } = process || {};
  const { exists, updateFolder } = useFileSystem();
  const { windowStates } = useSession();
  const [currentUrl, setCurrentUrl] = useState(url);
  const [history, setHistory] = useState<string[]>([url]);
  const [position, setPosition] = useState<number>(0);
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputBar, setInputBar] = useState(url);
  const [addressBar, setAddressBar] = useState<string[]>([""]);

  const moveHistory = (step: number): void => {
    const newPosition = position + step;

    setPosition(newPosition);
    setCurrentUrl(history[newPosition]);
    changeUrl(id, history[newPosition]);
  };
  const canGoBack = position > 0;
  const canGoForward = position < history.length - 1;
  const upTo = url === "/" ? undefined : basename(dirname(url));
  const inputBarRef = useRef<HTMLInputElement | null>(null);
  const addressBarRef = useRef<HTMLButtonElement | null>(null);
  const breadcrumbsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (url !== currentUrl) {
      setPosition(position + 1);
      setCurrentUrl(url);
      setHistory([...history.slice(0, position + 1), url]);
    }
  }, [currentUrl, history, position, url]);

  useEffect(() => {
    if (inputBarRef.current && showInputBox) {
      inputBarRef.current.focus();
      inputBarRef.current.select();
    }
  }, [showInputBox]);

  // useEffect(() => {
  //   if (addressBarRef.current && !showInputBox && breadcrumbsRef.current) {
  //     const addressList = currentUrl.split("/").slice(1);
  //     const addressBarWidth =
  //       addressBarRef.current.getBoundingClientRect().width;
  //     const breadcrumbsWidth =
  //       breadcrumbsRef.current.getBoundingClientRect().width;
  //     const roundedOff = Math.round(addressBarWidth / breadcrumbsWidth);
  //     if (roundedOff <= addressList.length) {
  //       setAddressBar((prev) =>
  //         addressList.slice(2 + addressList.length - roundedOff),
  //       );
  //     } else setAddressBar(addressList);
  //   }
  // }, [currentUrl, showInputBox, windowStates]);

  // console.log(addressBar);

  return (
    <nav className="bg-[#2C2C2C] flex h-[43px] -mt-px items-center">
      <Button
        extraStyles={`p-2 rounded-md m-1 ${canGoBack ? "hover:bg-titlebar-backgroundHover" : ""}`}
        disabled={!canGoBack}
        onClick={() => moveHistory(-1)}
        title={
          canGoBack
            ? `Back to ${basename(history[position - 1]) || ROOT_NAME}`
            : "Back"
        }
      >
        <Back fill={canGoBack ? undefined : "#8C8C8C"} />
      </Button>
      <Button
        extraStyles={`p-2 rounded-md m-1 ${canGoForward ? "hover:bg-titlebar-backgroundHover" : ""}`}
        disabled={!canGoForward}
        onClick={() => moveHistory(1)}
        title={
          canGoForward
            ? `Forward to ${basename(history[position + 1]) || ROOT_NAME}`
            : "Forward"
        }
      >
        <Forward fill={canGoForward ? undefined : "#8C8C8C"} />
      </Button>
      <Button
        extraStyles={`p-2 rounded-md m-1 ${url === "/" ? "" : "hover:bg-titlebar-backgroundHover"}`}
        disabled={url === "/"}
        onClick={() => changeUrl(id, dirname(url))}
        title={
          url === "/"
            ? "Up one level"
            : `Up to "${upTo === "" ? ROOT_NAME : upTo}"`
        }
      >
        <Up fill={url === "/" ? "#8C8C8C" : undefined} />
      </Button>
      <Button
        onClick={() => updateFolder(url)}
        title="Refresh"
        extraStyles="p-2 rounded-md m-1 hover:bg-titlebar-backgroundHover"
      >
        <Refresh />
      </Button>
      <input
        ref={inputBarRef}
        className={`bg-[#383838] outline-none h-[30px] w-full text-white text-sm font-normal ${showInputBox ? "visible" : "hidden"} rounded-md`}
        type="text"
        onBlur={() => setShowInputBox(false)}
        onChange={({ target }) => setInputBar(target.value)}
        onKeyDown={async ({ key }) => {
          if (key === "Enter" && inputBarRef.current) {
            const { value } = inputBarRef.current || {};

            if (value && (await exists(value))) {
              changeUrl(id, value);
            }

            inputBarRef.current.blur();
          }
        }}
        value={inputBar}
      />
      <button
        type="button"
        ref={addressBarRef}
        className={`${showInputBox ? "hidden" : "flex"} flex-row bg-[#383838] h-[30px] w-full min-w-[40px] items-center rounded-md cursor-context-menu overflow-hidden`}
        onClick={() => setShowInputBox(true)}
      >
        <PC extraStyles="ml-2" />
        {currentUrl
          .split("/")
          .slice(1)
          .map((dir) => (
            <div
              key={dir}
              ref={breadcrumbsRef}
              className="flex items-center gap-2"
            >
              <RightArrow extraStyles="mt-0.5 ml-2" />
              <span className="text-white text-xs font-normal">{dir}</span>
            </div>
          ))}
      </button>
      <input
        type="search"
        placeholder="Search"
        className="bg-[#383838] h-[30px] mx-3 w-full max-w-[200px]"
      />
    </nav>
  );
};

export default Navigation;
