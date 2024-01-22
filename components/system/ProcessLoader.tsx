"use client";

import dynamic from "next/dynamic";

import { useProcesses } from "@/contexts/process";

const Window = dynamic(() => import("@/components/system/Window"));

const ProcessLoader: React.FC = () => {
  const { processes } = useProcesses();

  return (
    <>
      {Object.entries(processes).map(([id, { Component, hasWindow = false }]) =>
        hasWindow ? (
          <Window key={id} id={id}>
            <Component id={id} />
          </Window>
        ) : (
          <Component key={id} id={id} />
        )
      )}
    </>
  );
};

export default ProcessLoader;
