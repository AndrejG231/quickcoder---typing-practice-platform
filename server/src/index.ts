import "dotenv/config";
import "reflect-metadata";
import cors from "cors";

import { createConnection, ConnectionOptions } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";

import enviromental from "./enviromental";
import * as entities from "./entities";
import resolvers from "./resolvers";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: enviromental.database_host,
  username: enviromental.database_username,
  database: enviromental.database_name,
  password: enviromental.database_password,
  port: ~~enviromental.database_port,
  logging: true,
  synchronize: true,
  entities: Object.values(entities),
};

const main = async () => {
  await createConnection(connectionOptions);

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
    }),
    context: ({ req, res }) => ({ req, res, enviromental }),
  }).applyMiddleware({ app, cors: false });

  app.listen(~~enviromental.server_port, () => {
    console.log("Server Started on localhost:");
  });
};

main();
