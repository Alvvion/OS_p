import styled from "styled-components";

export const StyledWindow = styled.section<{ $minimized?: boolean }>`
  background-color: ${({ theme }) => theme.colors.window};
  display: ${({ $minimized = false }) => ($minimized ? "none" : "block")};
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 50%);
  outline: ${({ theme }) => theme.sizes.window.outline};
  border-radius: 5px;
  overflow: hidden;
`;

export const AddTabsButton = styled.button.attrs({ type: "button" })``;

export const StyledTab = styled.div``;
