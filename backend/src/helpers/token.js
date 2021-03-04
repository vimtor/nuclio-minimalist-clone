import jwt from "jsonwebtoken";
import util from "util";

const jwtCreate = util.promisify(jwt.sign);

const jwtVerify = util.promisify(jwt.verify);

export const createToken = async (obj) => {
  return jwtCreate(obj, process.env.JWT_SECRET);
};

export const verifyToken = async (token) => {
  return jwtVerify(token, process.env.JWT_SECRET);
};
