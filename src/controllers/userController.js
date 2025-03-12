import asyncErrorHandler from "../utils/errorhandlers/asyncErrorHandler.js";
import db from "../db/models/index.js";


export const getAllUsers = asyncErrorHandler( async (req, res) => {
        // const result = await con.query(`SELECT * FROM users`)
        const users = await db.user.findAll();
        res.status(200).json(users)
})

export const getUser = asyncErrorHandler( async (req, res) => {
        const { id } = req.params;
        // const result = await con.query(`SELECT * FROM users WHERE id = $1`, [id])
        const result = await db.user.findOne({where : {id}})
        const user = result.dataValues;
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        res.status(200).json(user)
})

export const modifyUser = asyncErrorHandler( async (req, res) => {
        const { uname, mail } = req.body;
        // const result = await con.query(`UPDATE users SET uname = $1 WHERE mail = $2 RETURNING *`, [uname, mail])
        const [updatedCount] = await db.user.update({uname},{ where: {mail: mail}, returning: true})
        
        if (!updatedCount) {
            return res.status(400).json({ message: "no such user" })
        }

        res.status(201).json({ message: "user updated successfully" })
   
})

export const deleteUser = asyncErrorHandler( async (req, res) => {
        const {mail} = req.body
        // const result = await con.query(`DELETE FROM users WHERE mail = $1 RETURNING *`, [mail])

        const result = await db.user.destroy({where : {mail}})
        console.log(result);
        
        if(!result)
        {
            return res.json(400).json({message: "User not found"})
        }

        res.status(201).json({message: "user deleted successfully"})
})