import "dotenv/config";
import ReactDOM from "react-dom";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "./graphql/apolloClient";

import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";

import Routes from "./Routes";


ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={reduxStore}>
      <Routes />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
