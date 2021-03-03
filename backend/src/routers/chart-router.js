import { Router } from "express";
import protect from "../middlewares/protect";
import chartService from "../services/chart-service";

const router = Router();

router.use(protect);

router.get("/", async (req, res) => {
  const lists = await chartService.getChartTasks(req.userId);
  // const lists = await listService.getListsFromOwner(req.userId)
  res.json(lists);
});

export default router;
