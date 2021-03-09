import { Router } from "express";
import protect from "../middlewares/protect";
import listService from "../services/list-service";
import listPermissionRouter from "../middlewares/permission-list";

const router = Router();

router.use(protect);

router.param("listId", listPermissionRouter);

router.get("/", async (req, res) => {
  const lists = await listService.getListsFromOwner(req.userId);
  res.json(lists);
});

router.get("/:listId", async (req, res) => {
  const list = await listService.getById(req.params.listId);
  res.json(list);
});

router.post("/", async (req, res) => {
  const list = await listService.create({ ...req.body, owner: req.userId });
  res.status(201).json(list);
});

router.delete("/:listId", async (req, res) => {
  await listService.removeById(req.params.id);
  res.status(204).end();
});

router.put("/:listId", async (req, res) => {
  const list = await listService.updateById(req.params.id, req.body);
  console.log(list);

  res.json(list);
});

router.post("/:listId/tasks", async (req, res) => {
  const list = await listService.pushTask(req.params.listId, req.body);
  res.status(201).json(list);
});

router.put("/:listId/tasks/:taskId", async (req, res) => {
  const listId = req.params.listId;
  const taskId = req.params.taskId;

  const list = await listService.updateTask(listId, taskId, req.body);

  res.status(201).json(list);
});

router.delete("/:listId/tasks/:taskId", async (req, res) => {
  const listId = req.params.listId;
  const taskId = req.params.taskId;

  await listService.removeTask(listId, taskId);

  res.status(204).end();
});

router.delete("/:listId/tasks", async (req, res) => {
  const listId = req.params.listId;

  const filter = {};
  if (req.query.completed) {
    filter.completed = req.query.completed === "true";
  }

  await listService.removeAllTasks(listId, filter);
  res.status(204).end();
});
// Endpoint para compartir
router.put("/:listId/share", async (req, res) => {
  const listId = req.params.listId;
  const userEmails = req.body.userEmails;

  await listService.shareList(userEmails, listId);

  res.status(200).end();
});

// Enpoint para los owners menos el logged
router.get("/:listId/owners", async (req, res) => {
  const allOwners = await listService.getListOwners(req.params.listId);
  res.json(allOwners);
});

export default router;
