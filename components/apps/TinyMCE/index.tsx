import AppContianer from "@/components/common/AppContainer";
import type { ComponentProps } from "@/components/common/types";
import { useSession } from "@/context/Session";

import useTinyMCE from "./useTinyMCE";

const TinyMCE: React.FC<ComponentProps> = ({ id }) => {
  const { setForegroundId } = useSession();

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
      className="tinymce"
      id={id}
      useHook={useTinyMCE}
    >
      <div />
    </AppContianer>
  );
};

export default TinyMCE;
