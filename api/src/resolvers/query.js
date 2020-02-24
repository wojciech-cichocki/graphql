import authUtility from "../utilities/auth";

const Query = {
  test() {
    return "graphql response";
  },
  users(parent, { id, query }, { db }, info) {
    if (!query) {
      return db.getAllUser();
    }

    throw new Error("Not supported yet");
    // return db.users.filter(user => {
    //   return user.name.toLowerCase().includes(query.toLowerCase());
    // });
  },
  user(parent, { id }, { db }, info) {
    const user = db.users.find(user => user.id === id);
    if (!user) throw new Error("user not found");
    return user;
  },
  me(parent, args, { user }, info) {
    return user;
  },
  async login(parent, args, { db }, info) {
    const { email, password } = args.data;
    const user = await authUtility.findByCredentials(email, password);

    return await db.addTokenToUser(user.id);
  },
  posts(parent, { query }, { db }, info) {
    if (!query) {
      return db.posts;
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  post(parent, { id }, { db }, info) {
    const post = db.posts.find(post => post.id === id);
    if (!post) throw new Error("post not found");
    return post;
  },
  comments(parent, { query }, { db }, info) {
    if (!query) return db.comments;

    return db.comments.filter(comment =>
      comment.text.toLowerCase().includes(query.toLowerCase())
    );
  },
  comment(parent, { id }, { db }, info) {
    const comment = db.posts.find(comment => comment.id === id);
    if (!comment) throw new Error("comment not found");
    return comment;
  }
};

export { Query as default };
