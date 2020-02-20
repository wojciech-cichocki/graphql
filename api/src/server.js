import { GraphQLServer } from "graphql-yoga";
import context from "./contex";
import resolvers from "./resolvers";
import loggingMiddleware from "./middlewares";

const typeDefs = "./src/schema.graphql";

const graphQLServerConfig = {
  typeDefs,
  resolvers,
  context,
  middlewares: [loggingMiddleware]
};

const server = new GraphQLServer(graphQLServerConfig);

export { server as default };
