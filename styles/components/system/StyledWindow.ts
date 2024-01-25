import styled from "styled-components";

export const StyledWindow = styled.section<{ $minimized?: boolean }>`
  background-color: ${({ theme }) => theme.colors.window};
  display: ${({ $minimized = false }) => ($minimized ? "none" : "block")};
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 50%);
  outline: 1px solid rgba(0, 0, 0, 20%);
  border-radius: 5px;
  overflow: hidden;
`;

export const StyledTitlebar = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;

  h1 {
    color: #000;
    font-size: 11.5px;
    font-weight: normal;
    height: 29px;
  }

  figure {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      height: 16px;
      width: 16px;
      margin: 8px;
    }
  }
`;

export const StyledTitlebarButton = styled.button.attrs({ type: "button" })`
  width: 45px;
  height: 100%;

  &:disabled {
    &:hover {
      background-color: inherit;
    }
    svg {
      fill: rgb(205, 205, 205);
    }
  }

  &:hover {
    background-color: #e9e9e9;

    &.close {
      background-color: rgb(232, 17, 35);
      border-top-right-radius: 5px;
      transition: background-color 0.25 ease;

      svg {
        fill: #fff;
      }
    }
  }
  svg {
    width: 10px;
  }
`;

export const AddTabsButton = styled.button.attrs({ type: "button" })``;

export const StyledTab = styled.div``;
