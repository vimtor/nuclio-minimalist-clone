import listRepository from "../repositories/list-repository";

const getChartTasks = async (ownerId) => {
  const lists = await listRepository.getAllOwnerTasks(ownerId);
  const response = {};
  lists.map((list) => {
    list.tasks.map((task) => {
      //Create object of dates with number of completed tasks
      if (task.completed_date !== undefined && task.completed_by == ownerId) {
        const completed_date = task.completed_date.toLocaleDateString("es-ES");
        // if response[completed_date] exist, this object have completed and created elements, then we sum 1
        if (
          response[completed_date] !== undefined &&
          task.completed_by == ownerId
        ) {
          response[completed_date].completed += 1;
        } else {
          response[completed_date] = {
            completed: 1,
            created: 0,
          };
        }
      }
      //Create object of dates with number of created tasks
      const created_date = task.created_date.toLocaleDateString("es-ES");
      if (response[created_date] !== undefined) {
        response[created_date].created += 1;
      } else {
        response[created_date] = {
          completed: 0,
          created: 1,
        };
      }
    });
  });
  return response;
};

export default {
  getChartTasks,
};
