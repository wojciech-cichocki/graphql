const log = (resolve, parent, args, { request }, info) => {
  console.log(
    request.body.query || request.body.mutation || request.body.subscription
  );
  return resolve();
};

const loggingMiddleware = {
  Query: {
    test: log,
    login: log,
    me: log,
    users: log,
    posts: log,
    comment: log,
    user: log,
    post: log,
    comments: log
  },
  Mutation: {
    createUser: log,
    deleteMe: log,
    updateMe: log,
    createPost: log,
    createComment: log
  }
};

export { loggingMiddleware as default };
