import { useSession } from "@/context/Session";

import type { FocusableEntries } from "./types";

const useFocusableEntries = (
  fileManagerRef: React.MutableRefObject<HTMLOListElement | null>,
): FocusableEntries => {
  const { focusedEntries, blurEntry, focusEntry } = useSession();

  const onBlurCapture: React.FocusEventHandler = ({ relatedTarget }) => {
    if (
      !(relatedTarget instanceof HTMLElement) ||
      !fileManagerRef.current?.contains(relatedTarget)
    ) {
      blurEntry();
    }
  };

  return (file: string) => {
    const selectedFile = focusedEntries.includes(file);
    const onClick: React.MouseEventHandler = ({ ctrlKey }) => {
      if (ctrlKey) {
        if (focusedEntries.includes(file)) {
          blurEntry(file);
        } else {
          focusEntry(file);
        }
      } else {
        blurEntry();
        focusEntry(file);
      }
    };
    return { isSelected: !!selectedFile, onBlurCapture, onClick };
  };
};

export default useFocusableEntries;
