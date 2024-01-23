import styled from "styled-components";

export const StyledWindow = styled.section<{ $minimized?: boolean }>`
  background-color: ${({ theme }) => theme.colors.window};
  display: ${({ $minimized = false }) => ($minimized ? "none" : "block")};
  position: absolute;
`;

export const StyledTitlebar = styled.header``;

export const StyledTitlebarButton = styled.button.attrs({ type: "button" })`
  svg {
    height: 20px;
    width: 20px;
  }
`;
