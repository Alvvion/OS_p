import contextFactory from "../Context Factory";
import useThemeState from "./useThemeState";

const { Provider, useContext } = contextFactory(useThemeState);

export { Provider as ThemeProvider, useContext as useTheme };
