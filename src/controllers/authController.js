import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from "../db/models/index.js";
import asyncErrorHandler from "../utils/errorhandlers/asyncErrorHandler.js";
dotenv.config();

export const authUserLogin = asyncErrorHandler( async (req, res, next) => {
        const { mail, password } = req.body;
        
        // const result = await con.query("SELECT * FROM users WHERE mail = $1", [mail])

        const user = await  db.user.findOne({where: {mail}})
        
        if(!user)
        {
            res.status(400).json({message: 'Invalid mail'})
        }

        if(!await bcrypt.compare(password, user.password))
        {
            res.status(400).json({message: 'Invalid password'})
        }

        const authToken = jwt.sign({userId: user.id}, process.env.SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({ authToken });
})


export const authUserRegister = asyncErrorHandler( async (req, res) => {
    const { uname, mail, password } = req.body;
    const hashedPWD = await bcrypt.hash(password, 10)

    // const isExist = await con.query("SELECT * FROM users WHERE mail = $1", [mail])

    const isExist = await db.user.findOne({where : {mail : mail}})

    if(isExist)
    {
        return res.status(400).json({message: "Mail id already exists, try another one"})
    }

    // const result = await con.query(
    //     "INSERT INTO users (uname, mail, password) VALUES ($1, $2, $3) RETURNING *", [uname, mail, hashedPWD]
    // )

    const newUser = await db.user.create({
        uname,
        mail,
        password: hashedPWD
    })

    res.status(201).json(newUser)
})


export const authAdminRegister = asyncErrorHandler( async(req, res) => {
    const {uname, mail, password} = req.body
    const hashedPwd = await bcrypt.hash(password, 10)

    const isExist = await db.admin.findOne({where: {mail}})
    const isUser = await db.user.findOne({where :{mail}})
    
    if(isExist || isUser)
    {
        return res.status(400).json({message: "Mail id already exists, try another one"})
    }

    const newAdmin = db.admin.create({
        uname,
        mail,
        password: hashedPwd
    })

    res.status(201).json({message: "Admin "})
})

export const authAdminLogin = asyncErrorHandler(async (req, res) => {
    const {mail, password} = req.body

    const user = await db.admin.findOne({where : {mail}})

    if(!user)
    {
        return res.status(400).json({message: "Invalid mail"})
    }

    if(!await bcrypt.compare(password, user.password))
    {
        res.status(400).json({message: "Invalid password"})
    }

    const authToken = jwt.sign({userId:user.id}, process.env.SECRET_KEY, {expiresIn: '1hr'})

    res.status(200).json({Token: authToken})
})