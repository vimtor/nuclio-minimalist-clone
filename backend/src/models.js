const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    title: String,
    completed: Boolean,
})

const listSchema = new Schema({
    title: String,
    tasks: [taskSchema],
    owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
})

const userSchema = new Schema({
    email: String,
    password: String,
    lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
})

const User = model('User', userSchema)
const Task = model('Task', taskSchema)

listSchema.pre("remove", async function (next) {
    const filter = {lists: this._id};
    const update = {$pull: {lists: this._id}};
    await User.updateMany(filter, update)
    next()
})

const List = model('List', listSchema)

module.exports = {
    User,
    List,
    Task
}
