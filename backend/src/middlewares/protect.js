import userRepository from "../repositories/user-repository";
import { verifyToken } from "../helpers/token";

const protect = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ error: "You need a token" });
  }

  try {
    const decoded = await verifyToken(token);
    const exists = await userRepository.existsById(decoded.id);
    if (!exists) {
      res.status(403).json({ error: "Invalid token" });
      next();
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export default protect;
