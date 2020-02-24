import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// import db from "../db";
import db from "../prisma/prisma";

const config = {
  secret: "secret",
  salt: 8
};

const getUser = async request => {
  const rowToken =
    request.headers["authorization"] || request.headers["x-access-token"];

  if (!rowToken) return null;

  try {
    const tokenPrefix = "Bearer ";
    const token = rowToken.replace(tokenPrefix, "");
    const decodedPayload = jwt.verify(token, config.secret);
    const userId = decodedPayload.id;

    const userTokens = await db.getUserTokens(userId);

    console.log(userTokens);

    if (userTokens.includes(token)) {
      console.log("token found");
      const user = await db.getUserById(userId);
      console.log(user);
      return user;
    }
  } catch (e) {}
  return null;
};

const createToken = userIs => {
  return jwt.sign({ id: userIs }, config.secret);
};

const findByCredentials = async (email, password) => {
  const user = await db.getUserByEmail(email);

  if (!user) throw new Error("Invalid login or password");

  const isMatch = await bcrypt.compare(password, user.password);

  console.log(isMatch);

  if (!isMatch) return new Error("Invalid login or password");

  return user;
};

const verifyCredentials = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};

const hashPassword = async password => {
  return await bcrypt.hash(password, config.salt);
};

const authUtility = {
  getUser,
  createToken,
  findByCredentials,
  verifyCredentials,
  hashPassword
};

export { authUtility as default };
