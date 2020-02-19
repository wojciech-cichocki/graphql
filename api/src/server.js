import { GraphQLServer } from "graphql-yoga";

const typeDefs = "./src/schema.graphql";

const resolvers = {
  Query: {
    hello() {
      return "Hello world";
    }
  }
};

const graphQLServerConfig = {
  typeDefs,
  resolvers
};

const server = new GraphQLServer(graphQLServerConfig);

export { server as default };
