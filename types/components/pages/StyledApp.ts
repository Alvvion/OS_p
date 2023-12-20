import { ReactNode } from "react";
import { DefaultTheme } from "styled-components";

export type StyledAppProp = {
  children: ReactNode;
  currentTheme: DefaultTheme;
};
