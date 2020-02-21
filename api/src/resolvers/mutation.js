import uuidv4 from "uuid/v4";
import authUtility from "../utilities/auth";

const Mutation = {
  async createUser(parent, { data }, { db }, info) {
    const user = {
      id: uuidv4(),
      ...data
    };

    user.password = await authUtility.hashPassword(user.password);
    db.users.push(user);
    return authUtility.createToken(user);
  },
  async deleteMe(parent, { confirmPassword }, { db, user }, info) {
    const isMatch = await authUtility.verifyCredentials(user, confirmPassword);

    if (!isMatch) throw new Error("invalid confirmation password");

    const index = db.users.findIndex(u => u.id === user.id);
    db.users.splice(index, 1);
    return user;
  },
  updateMe(parent, { data }, { user }, info) {
    //TODO: important validation (id, tokens mustn't be modified)
    for (const key in user) {
      if (data[key]) {
        user[key] = data[key];
      }
    }
    return user;
  },
  createPost(parent, { data }, { db, user }, info) {
    const post = {
      id: uuidv4(),
      ...data,
      author: user.id
    };

    db.post.push(post);
    return post;
  }
};

export { Mutation as default };
