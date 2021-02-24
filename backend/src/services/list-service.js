import userRepository from '../repositories/user-repository'
import listRepository from '../repositories/list-repository'

const getListsFromOwner = async (ownerId) => {
    const user = await userRepository.findById(ownerId)
    return user.lists
}

const create = async ({owner, title, tasks}) => {
    const list = await listRepository.create({
        title: title || "Untitled tasks",
        tasks: tasks || [],
        owners: [owner]
    })

    await userRepository.addListToUser(owner, list._id)
    return list
}

const pushTask = async (listId, task) => {
    return listRepository.addTask(listId, task)
}

const getById = listRepository.findById

const removeById = listRepository.removeById

const updateById = listRepository.updateById

const updateTask = listRepository.updateTask

const removeTask = listRepository.removeTask

const removeAllTasks = listRepository.removeAllTasks

const getListOwners = async (listId) => {
    const list = await listRepository.findById(listId);
    return list.owners;
}

const shareList = async (userEmails, listId) =>{
    let users = [];
    for (const email of userEmails) {
        const user = await userRepository.findByEmail(email)
        users.push(user);
    }
    const list = await listRepository.findById(listId);
    const listOwners = [...list.owners, ...users];
    await listRepository.updateById(listId, {owners: listOwners});
}

export default {
    getListsFromOwner,
    getById,
    create,
    removeById,
    updateById,
    pushTask,
    updateTask,
    removeTask,
    removeAllTasks,
    shareList,
    getListOwners
}
