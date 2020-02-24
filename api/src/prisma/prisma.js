import { Prisma } from "prisma-binding";
import uuidv4 from "uuid/v4";
import auth from "../utilities/auth";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

const getAllUser = async (query, selectionSet) => {
  if (!query) return prisma.query.users(null, selectionSet);
};

const getUserByEmail = async (email, selectionSet) => {
  const user = await prisma.query.user(
    {
      where: {
        email
      }
    },
    selectionSet
  );

  return user;
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
  console.log("getUserTokens");
  if (!(await checkUserExist(userId))) {
    console.log("User not found");
    throw new Error("User not found");
  }

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

// const checkUserIncludesToken = async (userId, token) => {
//   const userTokens = await getUserTokens(userId);
//   return userTokens.includes(token);
// };

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

  console.log(userTokens);

  return newToken;
};

const addTokenToNewUser = async userId => {
  const newToken = await auth.createToken(userId);
  const tokens = [newToken];
  await updateUserToken(userId, tokens);
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
  return await addTokenToNewUser(user.id);
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

  // checkUserIncludesToken,
  getUserTokens,
  addTokenToUser,
  checkUserExist
};

const run = async () => {
  // console.log(await createUser("name", "email15", "password"));
};

run();

export { db as default };
