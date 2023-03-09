import db from "../config/database.connection.js";

export async function searchUsersByValue(search){

    return db.query(`
        SELECT * FROM users 
        WHERE users.username 
        ILIKE '$1%'
    `, [search]); 

}