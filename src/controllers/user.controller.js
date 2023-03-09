import {db} from "../config/database.connection.js";

export async function getUsersBySearch(req, res){

    try {

        const search = req.query.value;

        const result  = await db.query(`
            SELECT * FROM users 
            WHERE users.username 
            ILIKE '${search}%' 
    `); 

        return res.status(200).send(result.rows);
    } catch (e) {

        console.log(e);
        return res.sendStatus(500);
    }
}