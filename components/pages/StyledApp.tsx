import type { FC } from "react";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { SessionContext } from "@/contexts/sessions";
import GlobalStyle from "@/styles/GlobalStyles";
import { StyledAppProp } from "@/types/components/pages/StyledApp";

const StyledApp: FC<StyledAppProp> = ({ children, currentTheme }) => {
  const { theme } = useContext(SessionContext);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme || currentTheme}>{children}</ThemeProvider>
    </>
  );
};

export default StyledApp;
