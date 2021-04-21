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
import Users from "./entities/Users";
import PassTokens from "./entities/PassTokens";
import Practices from "./entities/Practices";
//==>Resolvers
import UserAuthResolver from "./resolvers/UserAuthResolver";
import ForgotPasswordResolver from "./resolvers/ForgotPasswordResolver";
import PracticeResolver from "./resolvers/PracticeResolver";
import PracticeStatsResolver from "./resolvers/PracticeStatsResolver";
import MenuResolver from "./resolvers/MenuResolver";
import { DevelopmentUserResolver } from "./development/DevelopmentResolver";
//==>Typess";

//==>Test
// import runTest from "./tests/test";

const main = async () => {
  const entities = [Users, PassTokens, Practices];
  const resolvers: [Function, ...Function[]] = [
    UserAuthResolver,
    ForgotPasswordResolver,
    PracticeResolver,
    MenuResolver,
    PracticeStatsResolver,
    /* DEV ONLY */ DevelopmentUserResolver,
  ];

  /////////
  //SETUP//
  /////////

  await createConnection({ ...PG_SETTING, entities: entities } as any);

  // await getConnection().createQueryBuilder().delete().from(Practices).execute()

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
