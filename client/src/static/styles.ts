import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    b5: "black",
    b4: "rgb(26, 26, 26)",
    b3: "rgb(51, 51, 51)",
    b2: "rgb(82, 82, 95)",
    b1: "rgb(116, 116, 117)",
    w5: "white",
    w4: "rgb(227, 227, 227)",
    w3: "rgb(194, 188, 188)",
    w2: "rgb(160,160,160)",
    err1: "rgb(173, 23, 0)",
    err2: "rgb(255, 181, 169)",
  },
  arrowObject: `
  background: rgb(26, 26, 26);
  height: 100%;
  position: absolute;
  `,
  centerContent: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  width: 21,
};

export const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background: ${theme.colors.b2};
    }
    *{
      -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;
