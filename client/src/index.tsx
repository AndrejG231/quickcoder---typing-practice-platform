import "dotenv/config";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: process.env.APOLLO_SERVER!,
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById("root")
);
