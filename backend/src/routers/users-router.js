import {Router} from 'express'
import protect from '../middlewares/protect'
import userService from '../services/user-service'

const router = Router()

router.use(protect)

router.get('/emails', async (req, res) => {
    const users = await userService.getUsersEmails(req.userId); 
    res.json(users);
})


export default router
