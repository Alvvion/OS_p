import styled from "styled-components";

const StyledJSDOS = styled.div`
  background-color: #000;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    top: 0 !important;
  }

  div {
    display: none;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { StyledJSDOS };
