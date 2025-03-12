import db from "../db/models/index.js";

export const findIdbyMail = async (mail) => {
        const user = await db.user.findOne({where : {mail}})
        const user_id = await user.dataValues.id;
        return user_id
}