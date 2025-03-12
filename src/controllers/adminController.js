
import asyncErrorHandler from "../utils/errorhandlers/asyncErrorHandler.js";
import db from "../db/models/index.js";

export const getAllUsers = asyncErrorHandler(async(req, res) => {
    const users = await db.user.findAll()
    res.status(200).json(users)
})

export const getAllTasks = asyncErrorHandler( async(req, res) => {
    const tasks = await db.task.findAll()
    res.status(200).json(tasks)
})