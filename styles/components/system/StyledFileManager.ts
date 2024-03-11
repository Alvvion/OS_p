import styled from "styled-components";

export const StyledFileManager = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, 74px);
  grid-template-rows: repeat(auto-fill, 85px);
  height: ${({ theme }) => `calc(100% - ${theme.sizes.taskbar.height})`};
  grid-auto-flow: column;
  column-gap: 1px;
  row-gap: 10px;
  padding: 5px 0;
`;

export const StyledFileEntry = styled.li`
  display: flex;
  justify-content: center;
  padding: 2px;
  overflow: hidden;

  &:hover {
    background-color: hsla(0, 0%, 50%, 25%);
    border: 2px solid hsla(0, 0%, 50%, 25%);
    padding: 0;
    position: relative;

    &::before {
      border: 1px solid hsla(0, 0%, 70%, 55%);
      bottom: -1px;
      top: -1px;
      left: -1px;
      right: -1px;
      position: absolute;
      content: "";
    }
  }

  button {
    width: 100%;
    z-index: 1;

    figcaption {
      color: #fff;
      font-size: ${({ theme }) => theme.sizes.fileEntry.fontSize};
      text-shadow: 0 0 1px rgba(0, 0, 0, 75%), 0 0 2px rgba(0, 0, 0, 50%),
        0 0 3px rgba(0, 0, 0, 25%), 0 1px 1px rgba(0, 0, 0, 75%),
        0 1px 2px rgba(0, 0, 0, 50%), 0 1px 3px rgba(0, 0, 0, 25%),
        0 2px 1px rgba(0, 0, 0, 75%), 0 2px 2px rgba(0, 0, 0, 50%),
        0 2px 3px rgba(0, 0, 0, 25%);
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
      white-space: normal;
    }
    img {
      width: ${({ theme }) => theme.sizes.fileEntry.iconSize};
    }
  }
`;
