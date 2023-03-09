import {db} from "../config/database.connection.js";


export async function postNewPost(req, res) {
    // get user id from session
    const { userId } = res.locals.session;
    // get url and description from req.body
    const { url, description } = req.body;

    // insert into database
    try{
        await db.query(`
            INSERT INTO posts ("userId", url, description) 
            VALUES ($1, $2, $3)
        `, [userId, url, description]);
        res.sendStatus(201);       

    }catch(error){
        console.error(error);
        res.status(500).send("Internal server error");
    }

     


    
}