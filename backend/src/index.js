const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth-router')
const listRouter = require('./routes/list-router')

const port = process.env.PORT || 3001;

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRouter)
app.use(listRouter)

app.listen(port, () => {
    mongoose.connect('mongodb://localhost:3002/minimalist', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch(console.error)

    console.log(`Listening to http://localhost:${port}`);
})
