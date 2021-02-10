const {List} = require("../models");
const {Router} = require('express')
const protect = require('../middlewares/protect')
const {User} = require("../models");

const router = Router()

router.use(protect)

router.get('/lists', async (req, res) => {
    const lists = await List.find({ owners: req.userId })
    res.json(lists)
})

router.post('/lists', async (req, res) => {
    const user = await User.findById(req.userId)

    const list = await List.create({
        title: req.body.title || "Another list",
        tasks: req.body.tasks || [],
        owners: [user._id]
    })

    user.lists.push(list._id)

    await user.save()
    await list.save()

    res.status(201).json(list)
})

router.delete('/lists/:id', async (req, res) => {
    await List.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

router.put('/lists/:id', async (req, res) => {
    const list = await List.findById(req.params.id)

    list.title = req.body.title || list.title
    list.owners = req.body.owners || list.owners
    await list.save()

    res.json({message: 'List updated', data: {list}})
})

router.post('/lists/:listId/tasks', async (req, res) => {
    const listId = req.params.listId;
    const list = await List.findById(listId)
    list.tasks.push(req.body)
    await list.save()
    res.status(201).json({message: 'Task created', data: {list}})
})

router.delete('/lists/:listId/tasks/:taskId', async (req, res) => {
    const listId = req.params.listId;
    const taskId = req.params.taskId;

    const list = await List.findById(listId)
    list.tasks.id(taskId).remove()
    await list.save()

    res.status(204).json({message: 'Task deleted', data: {list}})
})

module.exports = router
