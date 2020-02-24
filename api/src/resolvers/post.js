const Post = {
  async author(parent, args, { db }, info) {
    return await db.getUserRelatedToPost(parent.id);
  },
  async comments(parent, args, { db }, info) {
    return await db.getCommentsRelatedToPost(parent.id);
  }
};

export { Post as default };
