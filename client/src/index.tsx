import "dotenv/config";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

client
  .query({
    query: gql`
      query userInfo {
        userInfo(id: 10)
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
