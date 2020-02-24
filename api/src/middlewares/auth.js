import authUtility from "../utilities/auth";

const auth = async (resolve, parent, args, context, info) => {
  const user = await authUtility.getUser(context.request);

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
    deleteMe: auth,
    updateMe: auth,
    createPost: auth,
    createComment: auth
  }
};

export { authMiddleware as default };
