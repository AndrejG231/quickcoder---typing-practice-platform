///////////////
// LIBRARIES //
///////////////

require("dotenv").config();
import "reflect-metadata";

import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import express from "express";

///////////
// FILES //
///////////

//==>Config
import { SERVER_PORT, PG_SETTING } from "./config";
//==>Entities
import Users from "./types/entities/Users";
//==>Resolvers
import UserAuthResolver from "./resolvers/UserAuthResolver";
import { DevelopmentUserResolver } from "./resolvers/Development";
//==>Types
import GraphqlContex from "./types/GraphqlContext";

//==>Test
// import runTest from "./tests/test";

const main = async () => {
  const entities = [Users]
  const resolvers: [Function, ...Function[]] = [UserAuthResolver, DevelopmentUserResolver]

  /////////
  //SETUP//
  /////////

  await createConnection({ ...PG_SETTING, entities: entities } as any);

  const server = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({resolvers: resolvers}),
    context: ({req, res}) => ({req, res})
  })

  apolloServer.applyMiddleware({app: server, cors: false})

  /////////
  //TESTS//
  /////////

  // runTest("", () => re.test(stg));

  ////////////////
  //SERVER START//
  ////////////////

  server.listen(SERVER_PORT, () => {
    console.log("Server Started on localhost:", SERVER_PORT);
  });
};

main();
