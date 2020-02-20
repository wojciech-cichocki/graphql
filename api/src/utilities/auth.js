import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../db";

const config = {
  secret: "secret",
  salt: 8
};

const getUser = request => {
  const rowToken =
    request.headers["authorization"] || request.headers["x-access-token"];

  if (!rowToken) return null;

  try {
    const tokenPrefix = "Bearer ";
    const token = rowToken.replace(tokenPrefix, "");
    const decodedPayload = jwt.verify(token, config.secret);

    const authUser = db.users.find(
      user => user.id === decodedPayload.id && user.tokens.includes(token)
    );

    return authUser !== undefined ? authUser : null;
  } catch (e) {
    return null;
  }
};

const createToken = user => {
  const token = jwt.sign({ id: user.id }, config.secret);
  if (user.tokens) user.tokens.push(token);
  else user.tokens = [token];

  return token;
};

const findByCredentials = async (email, password) => {
  const user = db.users.find(user => user.email === email);

  if (!user) throw new Error("Invalid login or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return new Error("Invalid login or password");

  return user;
};

const hashPassword = async password => {
  return await bcrypt.hash(password, config.salt);
};

const authUtility = { getUser, createToken, findByCredentials, hashPassword };

export { authUtility as default };
