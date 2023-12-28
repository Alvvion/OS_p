import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::after, *::before{
  border: 0;
  box-sizing: border-box;
  padding: 0;
  outline: 0;
  margin: 0;
}

ol, ul {
  list-style: none;
}
`;

export default GlobalStyle;
