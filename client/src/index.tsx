import "dotenv/config";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "./graphql/apolloClient";

import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";

import Routes from "./Routes";

const theme = {
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
};

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
