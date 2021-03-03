import {Router} from 'express'
import userService from '../services/user-service'
import {createToken} from "../helpers/token";
import { sendEmail } from "../helpers/mail"

const router = Router()

router.post('/register', async (req, res) => {
    const user = await userService.register(req.body)
    if(!user){
        res.status(403).json({message: "This email is currently in use!"});
        return
    }
    const token = await createToken({ id: user._id })

    //TODO Enhance result returned to fronted: how can we return a warning message?
    const userData = await userService.getUser(user._id);
    sendEmail(userData.email).then((value) => console.log(`sendEmail result: ${value}`));
    console.log('after sendEmail');     //work well

    res.json({token})
})

router.post('/login', async (req, res) => {
    const user = await userService.login(req.body)

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' })
        return
    }

    const token = await createToken({ id: user._id })
    res.json({token})
})

export default router
