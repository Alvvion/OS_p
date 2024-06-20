export interface TaskbarButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  visibility?: boolean;
  src: string;
  width: number;
  height: number;
  name: string;
  reqBottomNotch?: boolean;
  bottomnotch?: boolean;
  reference?: (taskbarEntry: HTMLButtonElement | null) => void;
}

export type TaskbarEntryProps = TaskbarButtonProps & {
  pid: string;
};

export type StartButtonProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
