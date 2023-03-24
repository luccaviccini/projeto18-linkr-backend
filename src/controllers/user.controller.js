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

      const posts = await db.query(`
        SELECT posts.*, users."pictureUrl", users.username as author
        FROM posts
        JOIN users ON posts."userId" = users.id
        WHERE posts."userId" = $1
        ORDER BY posts.id DESC
        LIMIT 20
      `, [userId]);
  
      const postData = await Promise.all(
        posts.rows.map(async (post) => {
          const metadata = await urlMetadata(post.url);
          return {
            url: post.url,
            title: metadata.title,
            metaDescription: metadata.description,
            imageUrl: metadata.image,
            siteUrl: metadata.url,
          };
        })
      );
  
      const postsWithLikes = await Promise.all(
        posts.rows.map(async (post) => {
          const likes = await db.query(`
            SELECT * FROM likes WHERE "postId"=$1
          `, [post.id]);
          const users = await Promise.all(
            likes.rows.map(async (like) => {
              const user = await db.query(`
                SELECT username FROM users WHERE id=$1
              `, [like.userId]);
              return user.rows[0].username;
            })
          );
          const postMetadata = postData.find(data => data.url === post.url) || {};
          return {
            ...post,
            ...postMetadata,
            likes: likes.rows.length,
            postLiked: users,
            users: users.slice(-2).reverse(),
          };
        })
      );
  
      res.send(postsWithLikes);
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
  

  export async function getUserById(req, res){

    const userId = req.params.id;

    try {

      const userInfo = await db.query(`
      SELECT "username" AS postauthor, "pictureUrl" As postpictureurl
      FROM users
      WHERE id = $1
    `, [userId]);

        return res.status(200).send(userInfo.rows);
    } catch (e) {

        console.log(e);
        return res.sendStatus(500);
    }
}