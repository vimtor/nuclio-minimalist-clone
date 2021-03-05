import userRepository from "../repositories/user-repository";
import listRepository from "../repositories/list-repository";

const getListsFromOwner = async (ownerId) => {
  const user = await userRepository.findById(ownerId);
  return user.lists;
};

const getListFromOwner = async (ownerId, listId) => {
  const list = await listRepository.findById(listId);
  if (list.owners.contain(ownerId)) return list;
  return null;
};

const create = async ({ owner, title, tasks }) => {
  const list = await listRepository.create({
    title: title || "Untitled tasks",
    tasks: tasks || [],
    owners: [owner],
  });

  await userRepository.addListToUser(owner, list._id);
  return list;
};

const pushTask = async (listId, task) => {
  return listRepository.addTask(listId, task);
};

const getById = listRepository.findById;

const removeById = listRepository.removeById;

const updateById = listRepository.updateById;

const updateTask = listRepository.updateTask;

const removeTask = listRepository.removeTask;

const removeAllTasks = listRepository.removeAllTasks;
const getListOwners = async (listId) => {
  let ownersInfo = [];
  const list = await listRepository.findById(listId);
  const ownersId = list.owners;

  await Promise.all(
    ownersId.map(async (id) => {
      const response = userRepository.findById(id);
      const user = await response;
      ownersInfo.push({ id: id, email: user.email });
    })
  );

  return ownersInfo;
};

const shareList = async (userEmails, listId) => {
  let owners = [];

  const emails = new Set(userEmails);

  for (const email of emails) {
    const user = await userRepository.findByEmail(email);
    if (user) {
      owners.push(user);
    }
  }
  await listRepository.updateById(listId, { owners: owners });
};

export default {
  getListsFromOwner,
  getListFromOwner,
  getById,
  create,
  removeById,
  updateById,
  pushTask,
  updateTask,
  removeTask,
  removeAllTasks,
  getListOwners,
  shareList,
};
