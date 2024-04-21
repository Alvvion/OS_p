import contextFactory from "../Context Factory";
import { initialThemeState } from "../Context Factory/initialContextStates";
import useThemeState from "./useThemeState";

const { Provider, useContext } = contextFactory(
  initialThemeState,
  useThemeState
);

export { Provider as ThemeProvider, useContext as useTheme };
