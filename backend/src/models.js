const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    title: String,
    completed: Boolean,
})

const listSchema = new Schema({
    title: String,
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [taskSchema],
})

const userSchema = new Schema({
    email: String,
    password: String,
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
})

const User = model('User', userSchema)
const List = model('List', listSchema)
const Task = model('Task', taskSchema)

module.exports = {
    User,
    List,
    Task
}
