const {List} = require("../models");
const {Router} = require('express')
const protect = require('../middlewares/protect')

const router = Router()

router.use(protect)

router.get('/lists', async (req, res) => {
   const lists = await List.find({ owners: { $in: [req.body.user._id]}})
    res.json(lists)
})

router.post('/lists', async (req, res) => {
    const user = req.body.user;

    const list = await List.create({
        title: req.body.title,
        tasks: req.body.tasks || [],
        owners: [user._id]
    })

    user.lists.push(list._id)

    await user.save()
    await list.save()

    res.status(201).json({ message: 'List created', data: {list}})
})

router.get('/lists/:id', async (req, res) => {
    const list = await List.findById(req.params.id).populate('owners', 'email').exec()
    res.json({message: 'List retrieved', data: { list }})
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
