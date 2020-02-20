import uuidv4 from "uuid/v4";
import authUtility from "../utilities/auth";

const Mutation = {
  createUser(parent, { data }, { db }, info) {
    const user = {
      id: uuidv4(),
      ...data
    };

    user.password = authUtility.hashPassword(user.password);
    db.users.push(user);
    return authUtility.createToken(user);
  }
};

export { Mutation as default };
