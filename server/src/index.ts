///////////////
// LIBRARIES //
///////////////

require("dotenv").config();
import "reflect-metadata";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import express from "express";

///////////
// FILES //
///////////

//==>Config
import { SERVER_PORT, PG_SETTING } from "./config";
//==>Entities
import Users from "./entities/Users";
//==>Resolvers
import UserAuthResolver from "./resolvers/UserAuthResolver";

//==>Test
// import runTest from "./tests/test";

const main = async () => {
  /////////
  //SETUP//
  /////////
  await createConnection({
    type: "postgres",
    ...PG_SETTING,
    logging: true,
    synchronize: true,
    entities: [Users],
  });

  const server = express();

  const schema = await buildSchema({
    resolvers: [UserAuthResolver],
  });

  server.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );

  /////////
  //TESTS//
  /////////

  // runTest("", () => "");

  ////////////////
  //SERVER START//
  ////////////////

  server.listen(SERVER_PORT, () => {
    console.log("Server Started on localhost:", SERVER_PORT);
  });
};

main();
