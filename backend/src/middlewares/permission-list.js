import listRepository from "../repositories/list-repository";

const listPermissionRouter = async (req, res, next, listId) => {
  const list = await listRepository.findById(listId);

  if (!list.owners.includes(req.userId)) {
    res.status(403).json({ error: "Permission Denied" });
  }
  next();
};

export default listPermissionRouter;
