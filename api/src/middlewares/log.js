const log = (resolve, parent, args, { request }, info) => {
  console.log(
    request.body.query || request.body.mutation || request.body.subscription
  );
  return resolve();
};

const loggingMiddleware = {
  Query: {
    test: log
  }
};

export { loggingMiddleware as default };
