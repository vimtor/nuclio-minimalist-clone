import {model, Schema} from 'mongoose'
import userRepository from './user-repository'

export const taskSchema = new Schema({
    title: String,
    completed: Boolean,
    completed_date: Date,
    created_date: Date
})

const listSchema = new Schema({
    title: String,
    tasks: [taskSchema],
    owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
})

listSchema.pre("remove", async function (next) {
    await userRepository.removeListFromUsers(this._id)
    next()
})

const listModel = model('List', listSchema)

const create = async (fields) => {
    return listModel.create(fields)
}

const findById = async (id) => {
  return listModel.findById(id)
}

const updateById = async (id, fields) => {
    await listModel.findByIdAndUpdate(id, fields)
    return listModel.findById(id)
}

const removeById = async (id) => {
  return listModel.findByIdAndRemove(id)
}

const addTask = async (id, task) => {
    await listModel.findByIdAndUpdate(id, {$push: {tasks: task}})
    return listModel.findById(id)
}

const updateTask = async (listId, taskId, newTask) => {
    const filter = {_id: listId, "tasks._id": taskId };
    const update = {$set: {}}
    Object.entries(newTask).forEach(([field, value]) => {
        update['$set'][`tasks.$.${field}`] = value
    })

    await listModel.updateOne(filter, update)
    return listModel.findById(listId)
}

const removeTask = async (listId, taskId) => {
    const filter = {_id: listId};
    const update = {$pull: {tasks: {_id: taskId}}};
    return listModel.updateOne(filter, update)
}

const removeAllTasks = async (listId, filter) => {
    return listModel.updateMany({_id: listId}, {$pull: {tasks: filter}})
}

const getAllTasks = async (user_id) => {

    let response = {};
    await listModel.find({owners: {$in: [user_id]}}).then((lists) =>{
        lists.map((list) => {
            list.tasks.map((task) => {
                //Create object of dates with number of completed tasks
                if(task.completed_date !== undefined){
                    const completed_date = task.completed_date.toLocaleDateString("es-ES");
                    // if response[completed_date] exist, this object have completed and created elements, then we sum 1
                    if(response[completed_date] !== undefined){
                        response[completed_date].completed = response[completed_date].completed + 1;
                    }else{
                        response[completed_date] = {
                            completed: 1,
                            created: 0,
                        };
                    }
                }

                //Create object of dates with number of created tasks
                const created_date = task.created_date.toLocaleDateString("es-ES");
                if(response[created_date] !== undefined){
                    response[created_date].created = response[created_date].created + 1;
                }else{
                    response[created_date] = {
                        completed: 0,
                        created: 1,
                    };
                }
            })
        })
    });
    return response;
}

export default {
    create,
    updateById,
    findById,
    removeById,
    addTask,
    updateTask,
    removeTask,
    removeAllTasks,
    getAllTasks
}


