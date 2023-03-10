import {db} from "../config/database.connection.js";
import urlMetadata from "url-metadata";

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

export async function getPostsUserSearched(req, res) {

    const userId = req.params.id;
    try {
      const userData = await db.query(`
        SELECT "username", "pictureUrl" FROM users
        WHERE id = $1
      `, [userId]);
  
      const postsData = await db.query(`
        SELECT * FROM posts
        WHERE "userId" = $1
      `, [userId]);
  
      const postData = await Promise.all(postsData.rows.map(async (post) => {
        const metadata = await urlMetadata(post.url);
        return {
          description: post.description,
          likes: post.likes,
          title: metadata.title,
          linkDescription: metadata.description,
          imageUrl: metadata.image,
          siteUrl: metadata.url || post.url // use post.url if metadata.url is undefined
        };
      }));
  
      const userPostsData = {
        username: userData.rows[0].username,
        pictureUrl: userData.rows[0].pictureUrl,
        posts: postData,
      };
  
      res.send(userPostsData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
  