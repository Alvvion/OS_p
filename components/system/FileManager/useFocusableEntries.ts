import { useSession } from "@/context/Session";

import type { FocusableEntries } from "./types";
import useFocusChecker from "./useFoucsChecker";

const useFocusableEntries = (
  fileManagerRef: React.MutableRefObject<HTMLOListElement | null>,
): FocusableEntries => {
  const { blurEntry, focusEntry } = useSession();
  const isFocused = useFocusChecker(fileManagerRef);

  const onBlurCapture: React.FocusEventHandler = ({ relatedTarget }) => {
    if (
      !(relatedTarget instanceof HTMLElement) ||
      !fileManagerRef.current?.contains(relatedTarget)
    ) {
      blurEntry();
    }
  };

  return (file: string) => {
    const onClick: React.MouseEventHandler = ({ ctrlKey }) => {
      if (ctrlKey) {
        if (isFocused(file)) {
          blurEntry(file);
        } else {
          focusEntry(file);
        }
      } else {
        blurEntry();
        focusEntry(file);
      }
    };
    return { isSelected: isFocused(file), onBlurCapture, onClick };
  };
};

export default useFocusableEntries;
