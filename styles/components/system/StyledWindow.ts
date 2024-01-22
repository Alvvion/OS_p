import styled from "styled-components";

const StyledWindow = styled.section<{ $minimized?: boolean }>`
  background-color: ${({ theme }) => theme.colors.window};
  display: ${({ $minimized = false }) => ($minimized ? "none" : "block")};
  position: absolute;
`;

export default StyledWindow;
