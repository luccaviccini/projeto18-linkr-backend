import { db } from "../config/database.connection.js";
import urlMetadata from "url-metadata";

export async function postNewPost(req, res) {
  // get user id from session
  const { userId } = res.locals.session;
  // get url and description from req.body
  const { url, description } = req.body;
  // insert into database
  try {
    await db.query(
      `
            INSERT INTO posts ("userId", url, description) 
            VALUES ($1, $2, $3)
        `,
      [userId, url, description]
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await db.query(`
      SELECT posts.*, users."pictureUrl", users.username as author
      FROM posts
      JOIN users ON posts."userId" = users.id
      ORDER BY posts.id DESC
      LIMIT 20
    `);

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





export async function postLikePost(req, res) {
  const { userId } = res.locals.session;
  const { id } = req.params;

  try {
    const post = await db.query(
      `
                SELECT * FROM posts WHERE id=$1
            `,
      [id]
    );

    if (!post.rows[0]) {
      return res.status(404).send("Post not found");
    }

    const like = await db.query(
      `
                SELECT * FROM likes WHERE "userId"=$1 AND "postId"=$2
            `,
      [userId, id]
    );

    if (like.rows[0]) {
      await db.query(
        `
                    DELETE FROM likes WHERE "userId"=$1 AND "postId"=$2
                `,
        [userId, id]
      );
      res.status(200).send("Post unliked");
    } else {
      await db.query(
        `
                    INSERT INTO likes ("userId", "postId") VALUES ($1, $2)
                `,
        [userId, id]
      );
      res.status(200).send("Post liked");
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

export async function deletePost(req,res){
    const {userId} = res.locals.session;
    const {id} = req.params;

    try {
        const post = await db.query(`
            SELECT * FROM posts WHERE id=$1
        `, [id])

        if(!post.rows[0]) return res.status(404).send("Post not found")

        if(post.rows[0].userId !== userId) return res.status(403).send("Forbidden")

       
        await db.query(`
            DELETE FROM likes WHERE "postId"=$1
        `, [id])
        await db.query(`
            DELETE FROM posts WHERE id=$1
        `, [id])

        res.status(200).send("Post deleted with success")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

export async function editPost(req,res){
    const {userId} = res.locals.session;
    const {id} = req.params;
    const {description} = req.body;

    try {
        const post = await db.query(`
            SELECT * FROM posts WHERE id=$1
        `, [id])

        if(!post.rows[0]) return res.status(404).send("Post not found")

        if(post.rows[0].userId !== userId) return res.status(403).send("Forbidden")

        await db.query(`
            UPDATE posts SET description=$1 WHERE id=$2
        `, [description, id])

        res.status(200).send("Post edited with success")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}