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
import UserResolver from "./resolvers/UserResolver";
//==>Utilities
import validateRegister from "./utilities/validateRegister";

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
    resolvers: [UserResolver],
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

  console.log(
    "Validate Register TEST:",
    await validateRegister({
      username: "AndrejG",
      email: "andrej.germic@gmail.com",
      password: "AG123456AG",
    })
  );

  ////////////////
  //SERVER START//
  ////////////////

  server.listen(SERVER_PORT, () => {
    console.log("Server Started on localhost:", SERVER_PORT);
  });
};

main();
