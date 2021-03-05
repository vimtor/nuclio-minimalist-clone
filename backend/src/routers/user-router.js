import { Router } from "express";
import protect from "../middlewares/protect";
import userService from "../services/user-service";

const router = Router();

router.use(protect);

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const list = await userService.updateProfile(userId, req.body);
  res.status(201).json(list);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const users = await userService.getUser(userId);
  res.json(users);
});

export default router;
