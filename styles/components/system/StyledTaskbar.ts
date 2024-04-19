import styled, { css } from "styled-components";

const centered = `
  display: flex;
  place-content: center;
  place-items: center;
`;

const StyledTaskbar = styled.nav`
  background-color: ${({ theme }) => theme.colors.taskbar.bgColor};
  position: absolute;
  z-index: 1000;
  bottom: 0;
  height: ${({ theme }) => theme.sizes.taskbar.height};
  width: 100vw;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const StyledInnerContainer = styled.div`
  height: 100%;
  ${centered}
`;

const StyledStartButton = styled.button.attrs({ type: "button" })<{
  $bottomnotch: string;
}>`
  height: 88%;
  max-width: ${({ theme }) => theme.sizes.taskbar.startButton.width};
  margin: 5px;
  padding: 5px;
  border-radius: 0.25rem;
  position: relative;
  background-color: ${({ $bottomnotch }) =>
    $bottomnotch === "true" ? "#292929" : "inherit"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    img {
      transform: scale(0.85);
    }
  }
  ${({ $bottomnotch }) =>
    $bottomnotch === "true" || $bottomnotch === "minimized"
      ? css`
  &::before {
        content: "";
        position: absolute;
        bottom: 0;
        width: ${$bottomnotch === "minimized" ? "6px" : "16px"};
        height: 4px;
        border-radius: 10px;
        background-color: gray;
        margin: -3px auto;
        left: 0;
        right: 0;
        transition: width 1 ease-in-out;
  `
      : undefined}

  ${centered}
`;

const StyledSearchContainer = styled.div`
  position: relative;
  height: 100%;

  img {
    position: absolute;
    top: 12px;
    left: 5px;
    z-index: 10;
  }
`;

const StyledSearch = styled.input`
  width: 200px;
  height: 31px;
  margin-top: 6px;
  border-radius: 25px;
  border: none;
  padding-left: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 14px;
`;

const StyledTaskbarEntries = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

const StyledTaskbarEntry = styled.div`
  height: 100%;
  position: absolute;
  left: 50px;
  ${centered}
`;

const StyledSideMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledLanguageButton = styled.button`
  color: ${({ theme }) => theme.colors.taskbar.text};
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88%;
  padding: 5px 10px;
  border-radius: 0.375rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.buttonHover};
  }

  &:active {
    color: ${({ theme }) => theme.colors.taskbar.langHover};
  }

  span {
    margin: 1px;
  }
`;

const StyledTaskButtons = styled.button`
  border-radius: 0.375em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem;
  color: ${({ theme }) => theme.colors.taskbar.text};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    padding-right: 2px;
  }
`;

const StyledClock = styled.time`
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.taskbar.text};
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  font-size: ${({ theme }) => theme.sizes.taskbar.clock.fontSize};
  height: 88%;
  padding: 0.3rem;
  border-radius: 0.25rem;
  ${centered}

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.buttonHover};
  }

  &:hover::after {
    content: attr(data-tooltip);
    display: block;
    position: absolute;
    top: -30px;
    right: 0px;
    background-color: #333;
    color: #fff;
    padding: 5px 7px;
    border-radius: 5px;
    z-index: 100;
    white-space: nowrap;
  }

  span {
    text-align: right;
    width: 100%;
  }
`;

export {
  StyledClock,
  StyledInnerContainer,
  StyledLanguageButton,
  StyledSearch,
  StyledSearchContainer,
  StyledSideMenu,
  StyledStartButton,
  StyledTaskbar,
  StyledTaskbarEntries,
  StyledTaskbarEntry,
  StyledTaskButtons,
};
