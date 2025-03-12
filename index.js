import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/routes/authRoutes.js'
import taskRouter from './src/routes/taskRoutes.js'
import adminRouter from './src/routes/adminRoutes.js'
import cors from 'cors'
import globalErrorHandler from './src/utils/errorhandlers/globalErrorHandler.js';
import db from './src/db/models/index.js'
import customError from './src/utils/errorhandlers/customError.js';
import {successHandler, errorHandler} from './src/utils/logging/morgan.js'

const corsOptions = {
    origin: '*',
}

dotenv.config({path: `${process.cwd()}/.env.development`});

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(successHandler)
app.use(errorHandler)

const PORT = process.env.PORT ?? 3000;

app.use('/api', userRouter)
app.use('/api/task', taskRouter)
app.use('/api/admin', adminRouter)
app.all('*', (req, res, next) => {
    const err = new customError(`Can't find ${req.originalUrl} on the server!`, 404)
    next(err)
})

app.use(globalErrorHandler)

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return db.sequelize.sync(); 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });