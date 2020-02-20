import Query from "./resolvers/query";
import User from "./resolvers/user";
import Post from "./resolvers/post";
import Comment from "./resolvers/comment";

const resolvers = {
  Query,
  User,
  Post,
  Comment
};

export { resolvers as default };
