import {Router} from 'express'
import protect from '../middlewares/protect'
import listService from '../services/list-service'

const router = Router()

router.use(protect)

router.get('/', async (req, res) => {
    console.log('prueba');
    const lists = await listService.getListsFromOwner(req.userId)
    res.json(lists)
})

router.get('/:id', async (req, res) => {
    const list = await listService.getById(req.params.id)
    res.json(list)
})

router.post('/', async (req, res) => {
    const list = await listService.create({...req.body, owner: req.userId})
    res.status(201).json(list)
})

router.delete('/:id', async (req, res) => {
    await listService.removeById(req.params.id)
    res.status(204).end()
})

router.put('/:id', async (req, res) => {
    const list = await listService.updateById(req.params.id, req.body)
    res.json(list)
})

router.post('/:listId/tasks', async (req, res) => {
    const list = await listService.pushTask(req.params.listId, req.body)
    res.status(201).json(list)
})

router.put('/:listId/tasks/:taskId', async (req, res) => {
    const listId = req.params.listId;
    const taskId = req.params.taskId;

    const list = await listService.updateTask(listId, taskId, req.body)

    res.status(201).json(list)
})

router.delete('/:listId/tasks/:taskId', async (req, res) => {
    const listId = req.params.listId;
    const taskId = req.params.taskId;

    await listService.removeTask(listId, taskId)

    res.status(204).end()
})

router.delete('/:listId/tasks', async (req, res) => {
    const listId = req.params.listId;

    const filter = {}
    if (req.query.completed) {
        filter.completed = req.query.completed === 'true'
    }

    await listService.removeAllTasks(listId, filter)
    res.status(204).end()
})

export default router
