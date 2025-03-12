import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({message: "user not verified"})
    }

    try{
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        next()
    }
    catch(error)
    {
        console.log("Token verification failed", error);
        res.status(401).json({message: "unauthorized user"})
    }
}