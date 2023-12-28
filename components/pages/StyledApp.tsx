import { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { SessionContext } from "@/contexts/sessions";
import GlobalStyle from "@/styles/GlobalStyles";
import themes from "@/styles/themes";
import { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const StyledApp: React.FC<ChildrenProp> = ({ children }) => {
  const { themeName } = useContext(SessionContext);
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
