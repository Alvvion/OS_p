import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";

import useTinyMCE from "./useTinyMCE";

const TinyMCE: React.FC<ComponentProps> = ({ id }) => {
  const { setForegroundId } = useSession();
  const { sizes } = useTheme();

  const maybeMaintainFocus: React.FocusEventHandler = ({ relatedTarget }) => {
    if (
      relatedTarget instanceof HTMLElement &&
      document.body.querySelector(".tox-tinymce-aux")?.contains(relatedTarget)
    )
      setForegroundId(id);
  };

  return (
    <AppContianer
      onBlur={maybeMaintainFocus}
      style={{ height: `calc(100% - ${sizes.taskbar.height})` }}
      className="tinymce"
      id={id}
      useHook={useTinyMCE}
    >
      <div />
    </AppContianer>
  );
};

export default TinyMCE;
