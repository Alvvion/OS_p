"use client";

import dynamic from "next/dynamic";
import { useContext } from "react";

import { ProcessContext } from "@/contexts/process";

// import Window from "./Window";

const Window = dynamic(() => import("@/components/system/Window"));

const ProcessLoader: React.FC = () => {
  const { processes } = useContext(ProcessContext);

  return (
    <>
      {Object.entries(processes).map(([id, { Component, hasWindow = false }]) =>
        hasWindow ? (
          <Window key={id}>
            <Component />
          </Window>
        ) : (
          <Component key={id} />
        )
      )}
    </>
  );
};

export default ProcessLoader;
