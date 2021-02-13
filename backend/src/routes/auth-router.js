const {Router} = require('express')
const jwt = require('jsonwebtoken')
const util = require('util')
const bcrypt = require('bcrypt')
const {sendWelcomeEmail} = require("../services/email-service");
const {User} = require("../models");
const {List} = require("../models");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
const mongoose = require("mongoose");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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

    const user = new User({
        email,
        password: await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    })

    user.lists = [list._id]
    list.owners = [user._id]

    await user.save()
    await list.save()

    await sendWelcomeEmail({email})

    const token = await createToken({ id: user._id }, process.env.JWT_SECRET)
    res.json({token})
})

router.post('/auth/google', async (req, res) => {
    const result = await admin.auth().verifyIdToken(req.body.token)
    const picture = result.picture
    const email = result.email

    let user = await User.findOne({email})

    if (!user) {
        const list = new List({
            title: 'My tasks',
            tasks: [
                { title: 'Do dishes', completed: false },
                { title: 'Walk the dog', completed: true },
            ]
        })

        user = new User({
            email,
            picture,
        })

        user.lists = [list._id]
        list.owners = [user._id]

        await user.save()
        await list.save()
    }

    const token = await createToken({id: user._id}, process.env.JWT_SECRET)
    res.json({token})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!await bcrypt.compare(password, user.password)) {
        res.status(401).json({ message: 'Invalid credentials' })
    }
    else {
        const token = await createToken({id: user._id}, process.env.JWT_SECRET)
        res.json({token})
    }
})

module.exports = router
