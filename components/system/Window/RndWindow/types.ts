import type { ChildrenProp, Position, Size } from "@/types/common";

export type RndWindowProps = ChildrenProp & {
  id: string;
  style: React.CSSProperties;
};

export type Title = {
  appendFileToTitle: (url: string) => void;
};

export type StatePosition = [
  Position,
  React.Dispatch<React.SetStateAction<Position>>
];

export type StateSize = [Size, React.Dispatch<React.SetStateAction<Size>>];
