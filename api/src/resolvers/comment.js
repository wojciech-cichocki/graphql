const Comment = {
  async author(parent, args, { db }, info) {
    return await db.getUserRelatedToComment(parent.id);
  },
  async post(parent, args, { db }, info) {
    return await db.getPostRelatedToComment(parent.id);
  }
};

export { Comment as default };
