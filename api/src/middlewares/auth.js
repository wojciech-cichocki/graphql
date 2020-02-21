import authUtility from "../utilities/auth";

const auth = (resolve, parent, args, context, info) => {
  const user = authUtility.getUser(context.request);

  if (!user) throw new Error("Not authenticated user");
  context.user = user;

  return resolve();
};

const authMiddleware = {
  Query: {
    test: auth,
    me: auth,
    users: auth,
    posts: auth,
    comment: auth,
    user: auth,
    post: auth,
    comments: auth
  },
  Mutation: {
    deleteMe: auth
  }
};

export { authMiddleware as default };
