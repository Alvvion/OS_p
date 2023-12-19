"use client";

import type { FC } from "react";
import { useContext } from "react";

import { ProcessContext } from "@/contexts/process";

const WindowManager: FC = () => {
  const { processes } = useContext(ProcessContext);

  return (
    <>
      {Object.entries(processes).map(([id, { Component }]) => (
        <Component key={id} />
      ))}
    </>
  );
};

export default WindowManager;
