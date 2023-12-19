import type { FC } from "react";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { SessionContext } from "@/contexts/sessions";
import GlobalStyle from "@/styles/GlobalStyles";
import themes from "@/styles/themes.json";
import { StyledAppProps } from "@/types/components/pages/StyledApp";

const StyledApp: FC<StyledAppProps> = ({ children }) => {
  const { theme } = useContext(SessionContext);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme || themes.default}>{children}</ThemeProvider>
    </>
  );
};

export default StyledApp;
