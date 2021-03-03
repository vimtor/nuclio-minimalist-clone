import listRepository from "../repositories/list-repository";

const getChartTasks = async (ownerId) => {
  return listRepository.getAllTasks(ownerId);
};

export default {
  getChartTasks,
};
