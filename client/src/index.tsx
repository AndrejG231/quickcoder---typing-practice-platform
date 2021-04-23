import "dotenv/config";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "./styles";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "./graphql/apolloClient";

import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";

import Routes from "./Routes";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={reduxStore}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
