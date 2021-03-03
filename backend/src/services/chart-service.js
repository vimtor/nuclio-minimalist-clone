import userRepository from '../repositories/user-repository'
import listRepository from '../repositories/list-repository'

const getChartTasks = async (ownerId) => {
    const tasks = await listRepository.getAllTasks(ownerId)
    return tasks

}

export default {
    getChartTasks
}
