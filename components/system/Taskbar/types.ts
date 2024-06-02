export interface TaskbarButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
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