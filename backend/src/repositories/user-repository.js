import {Schema, model} from "mongoose";
import {encryptPassword} from "../helpers/password";
import listRepository from './list-repository';

const userSchema = new Schema({
    email: String,
    password: String,
    lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
})

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await encryptPassword(user.password)
    }
    next();
})

const userModel = model('User', userSchema)

const getUser = async (id) => {
  return userModel.find({_id: id});
}

const getAllUsers = async (id) => {
  return userModel.find({_id: {$ne: id}});
}

const existsById = async (id) => {
  return userModel.exists({_id: id})
}

const create = async (fields) => {
    return userModel.create(fields)
}

const updateById = async (id, fields) => {
    return userModel.findByIdAndUpdate(id, fields)
}

const removeListFromUsers = async (listId) => {
  return userModel.updateMany({lists: listId}, {$pull: {lists: listId}})
}

const findByEmail = async (email) => {
  return userModel.findOne({email})
}

const findById = async (id) => {
    return userModel.findById(id).populate("lists", "title")
}

const addListToUser = async (userId, listId) => {
  return userModel.findByIdAndUpdate(userId, {$push: {lists: listId}})
}


export default {
    getAllUsers, 
    getUser,
    create,
    updateById,
    existsById,
    removeListFromUsers,
    findByEmail,
    findById,
    addListToUser
}
