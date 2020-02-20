import db from "./db";

const context = ({ request }) => {
  return {
    db,
    request
  };
};

export { context as default };
