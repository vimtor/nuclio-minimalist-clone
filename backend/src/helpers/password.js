import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
    return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
}

export const comparePasswords = async ({hash, plain}) => {
  return bcrypt.compare(plain, hash)
}

