import authUtility from "../utilities/auth";

const auth = (resolve, parent, args, context, info) => {
  const user = authUtility.getUser(context.request);

  if (!user) throw new Error("Not authenticated user");
  context.user = user;

  return resolve();
};

const authMiddleware = {
  Query: {
    users: auth
  }
};

export { authMiddleware as default };
