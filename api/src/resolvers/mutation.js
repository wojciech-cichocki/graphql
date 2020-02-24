import uuidv4 from "uuid/v4";
import authUtility from "../utilities/auth";

const Mutation = {
  async createUser(parent, { data }, { db }, info) {
    const { name, email, password } = data;

    const user = await db.createUser(name, email, password);
    console.log(user);
    return user;
  },
  async deleteMe(parent, { confirmPassword }, { db, user }, info) {
    //TODO: add cascading deletion posts and comments
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

    db.posts.push(post);
    return post;
  },
  createComment(parent, { data }, { db, user }, info) {
    const comment = {
      id: uuidv4(),
      ...data,
      author: user.id
    };

    db.comments.push(comment);
    return comment;
  }
};

export { Mutation as default };
