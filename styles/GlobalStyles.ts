import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::after, *::before{
  border: 0;
  box-sizing: border-box;
  padding: 0;
  outline: 0;
  margin: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  user-select: none !important;
  overflow: hidden;
  position: fixed;
}

ol, ul {
  list-style: none;
}

button {
  background-color: transparent;
  font-family: inherit;
}
`;

export default GlobalStyle;
