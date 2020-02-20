import Query from "./resolvers/query";
import Mutation from "./resolvers/mutation";
import User from "./resolvers/user";
import Post from "./resolvers/post";
import Comment from "./resolvers/comment";

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment
};

export { resolvers as default };
