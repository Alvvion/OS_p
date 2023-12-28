import { DefaultTheme } from "styled-components/dist/types";

type Themes = {
  [key: string]: DefaultTheme;
};

const themes: Themes = {
  default: {
    colors: {
      primary: "#008000",
      window: "#808080",
    },
  },
};

export default themes;
