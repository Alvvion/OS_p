import type { ChildrenProp, Position, Size } from "@/components/common/types";

export type RndWindowProps = ChildrenProp & {
  id: string;
  style: React.CSSProperties;
};

export type StatePosition = [
  Position,
  React.Dispatch<React.SetStateAction<Position>>
];

export type StateSize = [Size, React.Dispatch<React.SetStateAction<Size>>];
