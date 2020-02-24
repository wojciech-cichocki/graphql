const User = {
  async posts(parent, args, { db }, info) {
    return await db.getPostRelatedToUser(parent.id);
  },
  async comments(parent, args, { db }, info) {
    return await db.getCommentRelatedToUser(parent.id);
  },
};

export { User as default };
