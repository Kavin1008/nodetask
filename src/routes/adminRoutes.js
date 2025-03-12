import express from 'express'
import { getAllTasks, getAllUsers } from '../controllers/adminController.js'
import { verifyToken } from '../middlewares/verifyTokenMiddleware.js'

const router = express.Router()

router.post('/listusers',verifyToken, getAllUsers)
router.post('/listtasks',verifyToken, getAllTasks)

export default router