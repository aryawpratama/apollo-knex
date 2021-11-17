import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { globalDefs } from "../global/global.defs";
import { globalResolvers } from "../global/global.resolvers";
export const startApolloServer = async () => {
  const PORT = 2300;
  const typeDefs = globalDefs;
  const resolvers = globalResolvers;
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer({
    schema,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  httpServer.listen(PORT, () => {
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: apolloServer.graphqlPath,
    });
    console.log(
      `Graphql server running on http://localhost:${PORT}${apolloServer.graphqlPath}, Graphql websocket running on ws://localhost:${PORT}${apolloServer.graphqlPath}
      `
    );
    useServer({ schema }, wsServer);
  });
};
