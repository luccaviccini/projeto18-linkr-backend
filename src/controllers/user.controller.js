import db from "../config/database.connection.js";
import { searchUsersByValue } from "../repositories/user.repository.js";

export async function getUsersBySearch(req, res){

    try {

        const search = req.query.value;

        const result  = await searchUsersByValue(search);

        return res.status(200).send(result.rows);
    } catch (e) {

        console.log(e);
        return res.sendStatus(500);
    }
}