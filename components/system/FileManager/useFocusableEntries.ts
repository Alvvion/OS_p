import { useSession } from "@/context/Session";

import type { FocusableEntries } from "./types";

const useFocusableEntries = (
  fileManagerRef: React.MutableRefObject<HTMLOListElement | null>,
): FocusableEntries => {
  const { blurEntry, focusEntry, focusedEntries } = useSession();

  const onBlurCapture: React.FocusEventHandler = ({ relatedTarget }) => {
    if (
      !(relatedTarget instanceof HTMLElement) ||
      !fileManagerRef.current?.contains(relatedTarget)
    ) {
      blurEntry();
    }
  };

  return (file: string) => {
    const isFocused = focusedEntries.includes(file);
    const onClick: React.MouseEventHandler = ({ ctrlKey }) => {
      if (ctrlKey) {
        if (isFocused) {
          blurEntry(file);
        } else {
          focusEntry(file);
        }
      } else {
        blurEntry();
        focusEntry(file);
      }
    };
    return { isSelected: isFocused, onBlurCapture, onClick };
  };
};

export default useFocusableEntries;
