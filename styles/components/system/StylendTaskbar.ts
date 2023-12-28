import styled from "styled-components";

const StyledTaskbar = styled.nav`
  position: fixed !important;
  bottom: 0;
  height: 30px;
  width: 100vw;
  background-color: blue;
  right: 0;
  left: 0;
`;

const StyledStartButton = styled.button`
  background-color: #777;
  position: absolute;
  left: 0;
  height: 100%;
  width: 30px;
`;

const StyledTaskbarEntries = styled.ol`
  background-color: orange;
  height: 100%;
  position: absolute;
  left: 30px;
  right: 120px;
  width: 100%;
`;

export { StyledStartButton, StyledTaskbar, StyledTaskbarEntries };
