import { useSession } from "@/context/Session";

import type { FocusableEntries } from "./types";

const useFocusableEntries = (
  fileManagerRef: React.MutableRefObject<HTMLOListElement | null>,
): FocusableEntries => {
  const { focusedEntries, blurEntry, focusEntry } = useSession();

  return (file: string) => {
    const selectedFile = focusedEntries.includes(file);
    const onBlurCapture: React.FocusEventHandler = ({ relatedTarget }) => {
      if (
        !(relatedTarget instanceof HTMLElement) ||
        !fileManagerRef.current?.contains(relatedTarget)
      ) {
        focusedEntries.forEach((focusedEntry) => blurEntry(focusedEntry));
      }
    };
    const onClick: React.MouseEventHandler = ({ ctrlKey }) => {
      if (ctrlKey) {
        if (focusedEntries.includes(file)) {
          blurEntry(file);
        } else {
          focusEntry(file);
        }
      } else {
        focusedEntries.forEach((focusedEntry) => blurEntry(focusedEntry));
        focusEntry(file);
      }
    };
    return { isSelected: !!selectedFile, onBlurCapture, onClick };
  };
};

export default useFocusableEntries;
