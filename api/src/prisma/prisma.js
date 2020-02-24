import { Prisma } from "prisma-binding";
import auth from "../utilities/auth";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

const getAllUser = async (query, selectionSet) => {
  if (!query) return prisma.query.users(null, selectionSet);
};

const getUserByEmail = async (email, selectionSet) => {
  return await prisma.query.user(
    {
      where: {
        email
      }
    },
    selectionSet
  );
};

const getAllPost = async selectionSet => {
  return prisma.query.posts(null, selectionSet);
};

const getAllComments = async selectionSet => {
  return prisma.query.comments(null, selectionSet);
};

const getUserById = async (userId, selectionSet) => {
  return await prisma.query.user(
    {
      where: {
        id: userId
      }
    },
    selectionSet
  );
};

const getPostById = async (postId, selectionSet) => {
  return await prisma.query.post(
    {
      where: {
        id: postId
      }
    },
    selectionSet
  );
};

const getCommentById = async (commentId, selectionSet) => {
  return await prisma.query.comment(
    {
      where: {
        id: commentId
      }
    },
    selectionSet
  );
};

const getPostRelatedToUser = async (userId, selectionSet) => {
  if (!(await checkUserExist(userId))) throw new Error("User not found");

  return await prisma.query.posts(
    {
      where: {
        author: {
          id: userId
        }
      }
    },
    selectionSet
  );
};

const getCommentRelatedToUser = async (postId, selectionSet) => {
  if (!(await checkPostExist(postId))) throw new Error("Post not found");

  return await prisma.query.comments(
    {
      where: {
        post: {
          id: postId
        }
      }
    },
    selectionSet
  );
};

const getUserTokens = async userId => {
  if (!(await checkUserExist(userId))) throw new Error("User not found");

  const userById = await prisma.query.user(
    {
      where: { id: userId }
    },
    "{ tokens }"
  );

  return userById.tokens;
};

const checkUserExist = async userId => {
  return await prisma.exists.User({ id: userId });
};

const checkPostExist = async postId => {
  return await prisma.exists.Post({ id: postId });
};

const checkCommentExist = async commentId => {
  return await prisma.exists.Comment({ id: commentId });
};

const updateUserToken = async (userId, userTokens) => {
  return await prisma.mutation.updateUser({
    where: { id: userId },
    data: {
      tokens: {
        set: userTokens
      }
    }
  });
};

const addTokenToUser = async userId => {
  const userTokens = await getUserTokens(userId);
  const newToken = auth.createToken(userId);
  userTokens.push(newToken);
  await updateUserToken(userId, userTokens);

  return newToken;
};

const createUser = async (name, email, password) => {
  const user = await prisma.mutation.createUser({
    data: {
      name,
      email,
      password: await auth.hashPassword(password)
    }
  });
  return await addTokenToUser(user.id);
};

const createNewToken = async userId => {
  if (!(await checkUserExist(userId))) throw new Error("User not found");

  return await addTokenToUser(userId);
};

const db = {
  createUser,
  createNewToken,

  getAllUser,
  getAllPost,
  getAllComments,

  getUserById,
  getUserByEmail,
  getPostById,
  getCommentById,

  getPostRelatedToUser,
  getCommentRelatedToUser,

  getUserTokens,
  addTokenToUser,
  checkUserExist
};

export { db as default };
