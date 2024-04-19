import styled from "styled-components";

export const StyledTitlebar = styled.header`
  background-color: ${({ theme }) => theme.colors.titlebar.bgColor};
  display: flex;
  justify-content: space-between;

  h1 {
    color: ${({ theme }) => theme.colors.titlebar.text};
    font-size: ${({ theme }) => theme.sizes.titlebar.fontSize};
    font-weight: normal;
    height: ${({ theme }) => theme.sizes.titlebar.height};
  }

  figure {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      height: ${({ theme }) => theme.sizes.titlebar.buttonIconWidth};
      width: ${({ theme }) => theme.sizes.titlebar.buttonIconWidth};
      margin: ${({ theme }) => theme.sizes.titlebar.iconMargin};
      image-rendering: pixelated;
    }
  }
`;

export const StyledTitlebarButton = styled.button.attrs({ type: "button" })`
  width: ${({ theme }) => theme.sizes.titlebar.buttonWidth};
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
    background-color: ${({ theme }) => theme.colors.titlebar.buttonHover};

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
