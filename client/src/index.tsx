import "dotenv/config";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles, reduxStore } from "./static/";

import { Provider } from "react-redux";

import Routes from "./Routes";

ReactDOM.render(
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
