import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    b5: "black",
    b4: "rgb(26, 26, 26)",
    b3: "rgb(51, 51, 51)",
    b2: "rgb(82, 82, 95)",
    w5: "white",
    w4: "rgb(227, 227, 227)",
    w3: "rgb(224, 218, 218)",
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
};

export const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
`;
