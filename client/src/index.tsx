import "dotenv/config";
import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: process.env.APOLLO_SERVER!,
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
