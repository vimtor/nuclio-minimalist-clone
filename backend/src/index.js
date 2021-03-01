import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from "express-rate-limit"
import mongoose from 'mongoose'
import errorHandler from "./middlewares/error-handler"
import authRouter from './routers/auth-router'
import listRouter from './routers/list-router'
import chartRouter from './routers/chart-router'
import morgan from "morgan";

const port = process.env.PORT || 3001;

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(helmet())
app.use(rateLimit({windowMs: 60000, max: 100}))
app.use(express.json())

app.use(authRouter)
app.use('/lists', listRouter)
app.use('/chart', chartRouter)

app.use(errorHandler)

app.listen(port, () => {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch(console.error)

    console.log(`Listening to http://localhost:${port}`);
})
