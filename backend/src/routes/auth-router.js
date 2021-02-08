const {Router} = require('express')
const jwt = require('jsonwebtoken')
const util = require('util')
const {User} = require("../models");
const {List} = require("../models");

const router = Router()

const createToken = util.promisify(jwt.sign)

router.post('/register', async (req, res) => {
    const {email, password} = req.body

    const list = new List({
        title: 'My tasks',
        tasks: [
            { title: 'Do dishes', completed: false },
            { title: 'Walk the dog', completed: true },
        ]
    })

    const user = new User({email, password})

    user.lists = [list._id]
    list.owners = [user._id]

    await user.save()
    await list.save()

    const token = await createToken({ id: user._id }, process.env.JWT_SECRET)
    res.json({token})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' })
    }
    else {
        const token = await createToken({id: user._id}, process.env.JWT_SECRET)
        res.json({token})
    }
})

module.exports = router
