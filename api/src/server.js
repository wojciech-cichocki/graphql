import { GraphQLServer } from "graphql-yoga";
import context from "./contex";
import resolvers from "./resolvers";
import middlewares from "./middlewares";
const typeDefs = "./src/schema.graphql";

const graphQLServerConfig = {
  typeDefs,
  resolvers,
  context,
  middlewares
};

const server = new GraphQLServer(graphQLServerConfig);

export { server as default };
