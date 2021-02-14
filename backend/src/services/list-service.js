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


export default {
    getListsFromOwner,
    getById,
    create,
    removeById,
    updateById,
    pushTask,
    updateTask,
    removeTask,
    removeAllTasks
}
