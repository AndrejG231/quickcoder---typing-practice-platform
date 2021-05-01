import "dotenv/config";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles, reduxStore } from "./static/";
import { Screen, GlobalMessage } from "./components";

import { Provider } from "react-redux";

import Routes from "./Routes";

ReactDOM.render(
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Screen>
        <Routes />
        <GlobalMessage />
      </Screen>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
