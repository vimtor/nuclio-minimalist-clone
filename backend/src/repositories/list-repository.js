import { model, Schema } from "mongoose";
import userRepository from "./user-repository";

export const taskSchema = new Schema({
  title: String,
  completed: Boolean,
  completed_date: Date,
  created_date: Date,
  dueDate: Date,
  completed_by: { type: Schema.Types.ObjectId, ref: "User" },
});

const listSchema = new Schema({
  title: String,
  tasks: [taskSchema],
  owners: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

listSchema.pre("remove", async function (next) {
  await userRepository.removeListFromUsers(this._id);
  next();
});

const listModel = model("List", listSchema);

const create = async (fields) => {
  return listModel.create(fields);
};

const findById = async (id) => {
  return listModel.findById(id);
};

const updateById = async (id, fields) => {
  await listModel.findByIdAndUpdate(id, fields);
  return listModel.findById(id);
};

const removeById = async (id) => {
  return listModel.findByIdAndRemove(id);
};

const addTask = async (id, task) => {
  await listModel.findByIdAndUpdate(id, { $push: { tasks: task } });
  return listModel.findById(id);
};

const updateTask = async (listId, taskId, newTask, userId) => {
  const filter = { _id: listId, "tasks._id": taskId };
  const update = { $set: {} };
  Object.entries(newTask).forEach(([field, value]) => {
    update["$set"][`tasks.$.${field}`] = value;
    if (field === "completed") {
      update["$set"][`tasks.$.completed_by`] = userId;
    }
  });

  await listModel.updateOne(filter, update);
  return listModel.findById(listId);
};

const removeTask = async (listId, taskId) => {
  const filter = { _id: listId };
  const update = { $pull: { tasks: { _id: taskId } } };
  return listModel.updateOne(filter, update);
};

const removeAllTasks = async (listId, filter) => {
  return listModel.updateMany({ _id: listId }, { $pull: { tasks: filter } });
};

const getAllOwnerTasks = async (userId) => {
  return listModel.find({ owners: { $in: [userId] } });
};

export default {
  create,
  updateById,
  findById,
  removeById,
  addTask,
  updateTask,
  removeTask,
  removeAllTasks,
  getAllOwnerTasks,
};
