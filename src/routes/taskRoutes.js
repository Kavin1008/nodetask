import express from 'express'
import { addTask, deleteTask, listTasks, updateTask } from '../controllers/taskController.js'
import { validateAddTasks, validateUpdateTasks } from '../middlewares/authTasksMiddleware.js'


const router = express.Router()

router.post('/addtask', validateAddTasks, addTask)
router.post('/listtasks', listTasks)
router.post('/deletetask', deleteTask)
router.post('/updatetask', validateUpdateTasks ,updateTask)

export default router