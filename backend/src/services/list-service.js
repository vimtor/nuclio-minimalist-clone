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
  const list = await listRepository.findById(listId);
  const ownerIds = list.owners;

  const promises = ownerIds.map(async (id) => {
    const user = await userRepository.findById(id);
    return { id: id, email: user.email, avatar: user.avatar };
  });

  return Promise.all(promises);
};

const shareList = async (userEmails, listId) => {
  const emails = [...new Set(userEmails)];

  const owners = await userRepository.findAllByEmails(emails);

  const promises = owners.map(async (user) => {
    await userRepository.updateById(user._id, {
      lists: [...user.lists, listId],
    });
  });

  await listRepository.updateById(listId, { owners });
  await Promise.all(promises);
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
