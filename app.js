import express from 'express'
import morgan from 'morgan'
import tourRouter from './routes/tourRoutes.js'
import userRouter from './routes/userRoutes.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

//DB CONNECTION STRING FROM MONGODB

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
//CONNECT TO DATABSE THROUGH MONGOOSE
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('MONGOOSE CONNECTION SUCCESSFUL'));


const app = express();
// MIDDLE-WARE NEEDED FOR POSTING
app.use(express.json())
//CUSTOM MIDDLEWARE (USE NEXT TO DENOTE MIDDLEWARE)
//USE GLOBAL MIDDLEWARE BEFORE YOU SEND ANY RESPONSE BACK
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    //MUST USE NEXT, OTHERWISE NO RESPONE WILL BE SENT BACK
    next();
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.static('./public'))

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

export default app