import { ThemeProvider } from "styled-components";

import { useSession } from "@/contexts/sessions";
import GlobalStyle from "@/styles/GlobalStyles";
import themes from "@/styles/themes";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const StyledApp: React.FC<ChildrenProp> = ({ children }) => {
  const { themeName } = useSession();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themes[themeName] || themes.default}>
        {children}
      </ThemeProvider>
    </>
  );
};

export default StyledApp;
