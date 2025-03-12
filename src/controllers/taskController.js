import { cache, updateCache } from "../utils/caching/redisCache.js";
import asyncErrorHandler from "../utils/errorhandlers/asyncErrorHandler.js";
import { findIdbyMail } from "../utils/userUtils.js";
import db from "../db/models/index.js";

export const addTask = asyncErrorHandler( async (req, res) => {
    const {taskname, description, mail } = req.body;

    const userid = await findIdbyMail(mail)
    const user_id = parseInt(userid)    
    
    const result = await db.task.create({
        taskname,
        description,
        user_id
    })

    if(!result)
    {
        return res.status(500).json({message: "task not added"})
    }

    res.status(201).json({message: "task added"})
})

export const listTasks = asyncErrorHandler( async (req, res) => {
    const {mail} = req.body;

    if(!mail)
    {
        return res.status(400).json({message: "mail id is required"})
    }

    const user_id = await findIdbyMail(mail);

    const tasks = await cache(`tasks:${user_id}`, async () => await db.task.findAll({where : {user_id}, order:[['createdAt', 'DESC']]}))
    
    res.status(200).json({tasks})
})

export const deleteTask = asyncErrorHandler( async (req, res) => {
    const {mail, task_id} = req.body;

    if(!mail || !task_id)
    {
        return res.status(400).json({message: "mail id and task id is required"})
    }

    const user_id = await findIdbyMail(mail);

    const task = await db.task.findOne({where : {task_id, user_id}})

    if(!task){
        return res.status(400).json({message: "not able to delete task"})
    }

    await task.destroy();

    res.status(200).json({message: `task with id: ${task_id} is deleted`})
})


export const updateTask = asyncErrorHandler( async (req, res) => {
    const {mail, task_id, taskname, description, status} = req.body;

    if(!mail || !task_id)
    {
        return res.status(400).json({message: "mail id and task id is required"})
    }

    const user_id = await findIdbyMail(mail)

    const task = await db.task.findOne({where : {task_id, user_id}})
    
    if(!task){
        return res.status(400).json({message: "not able to find task"})
    }

    const tasks = await updateCache(`tasks:${user_id}`,async() => await task.update({taskname: taskname || task.taskname,description: description || task.description,status: status || task.status}, {returning:true}))

    res.status(200).json({message: `changes saved to task with id: ${tasks.task_id}`})
})

