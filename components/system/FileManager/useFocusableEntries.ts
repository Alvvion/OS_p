import { useSession } from "@/context/Session";

import type { FocusedEntry } from "./types";

const useFocusableEntries = (
  fileManagerRef: React.MutableRefObject<HTMLOListElement | null>,
): {
  focusableEntry: (file: string) => FocusedEntry;
} => {
  const { focusedEntries, blurEntry, focusEntry } = useSession();
  const focusableEntry = (file: string): FocusedEntry => {
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

  return { focusableEntry };
};

export default useFocusableEntries;
