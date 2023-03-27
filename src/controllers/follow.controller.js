import { db } from "../config/database.connection.js";


export async function addFollow(req, res){

    const { followedId } = req.params;
    const { userId } = res.locals.session;

    console.log(followedId, userId);

    try{
          const { rowCount } = await db.query(`
              SELECT * FROM followers 
              WHERE followers."followerId" = $1 AND followers."followedId" = $2`,
              [userId, followedId]);
            
            if (rowCount > 0) {
                return res.status(400).send("This user is already followed!");
            }

        await   db.query(`
            INSERT INTO followers ("followerId", "followedId") 
            VALUES ($1,$2)`,
            [userId, followedId]);  

        res.status(201).send("User followed!");

    } catch(error){
        res.status(500).send(`Internal system error.\n More details: ${error.message}`);
    }
}



export async function deleteFollow(req, res) {
    const { followedId } = req.params;
    const { userId } = res.locals.session;

    console.log(followedId, userId);


    try {
        const { rowCount } = await db.query(`
        SELECT * FROM followers 
        WHERE followers."followerId" = $1 AND followers."followedId" = $2`,
        [userId, followedId]);    

      if (rowCount === 0) {
        return res.status(404).send("This user is not followed!");
      }


      await db.query(`
        DELETE FROM followers 
        WHERE followers."followerId" = $1 AND followers."followedId" = $2`, 
        [userId, followedId]);
      
      res.status(200).send("User removed from followed table!");
    } catch (error) {
      res
        .status(500)
        .send(`Internal system error.\n More details: ${error.message}`);
    }
  };



  export async function getFollowerById(req, res) {

    const { followedId } = req.params;
    const { userId } = res.locals.session;
    let isFollowed = false;

    try {
        const { rowCount } = await db.query(`
        SELECT * FROM followers 
        WHERE followers."followerId" = $1 AND followers."followedId" = $2`,
        [userId, followedId]);

        if (rowCount > 0) {
          //return true;
          isFollowed = true;
          res.status(200).send(isFollowed);
        } else {
            //return false;
        
            res.status(200).send(isFollowed);

        }
        
    } catch (error) {
        res
        .status(500)
        .send(`Internal system error.\n More details: ${error.message}`);
    }



  }