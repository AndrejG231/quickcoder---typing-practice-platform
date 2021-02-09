require("dotenv").config();
import "reflect-metadata";
import cors from "cors";

import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
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
import ForgotPasswordResolver from "./resolvers/ForgotPasswordResolver";
import { DevelopmentUserResolver } from "./development/DevelopmentResolver";
//==>Types
import PassTokens from "./types/entities/PassTokens";

//==>Test
// import runTest from "./tests/test";

const main = async () => {
  const entities = [Users, PassTokens];
  const resolvers: [Function, ...Function[]] = [
    UserAuthResolver,
    ForgotPasswordResolver,
    /* DEV ONLY */ DevelopmentUserResolver,
  ];

  /////////
  //SETUP//
  /////////

  await createConnection({ ...PG_SETTING, entities: entities } as any);

  const server = express();

  server.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: resolvers }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app: server, cors: false });

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
