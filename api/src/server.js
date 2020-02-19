import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";

const typeDefs = "./src/schema.graphql";

const graphQLServerConfig = {
  typeDefs,
  resolvers
};

const server = new GraphQLServer(graphQLServerConfig);

export { server as default };
