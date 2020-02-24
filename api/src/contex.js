import db from "./prisma/prisma";

const context = ({ request }) => {
  return {
    db,
    request
  };
};

export { context as default };
