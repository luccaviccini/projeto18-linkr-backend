import {
    filterHashtags,
    findHashtags,
} from "../repositories/HashtagsRepository.js";
import urlMetadata from "url-metadata";
import { db } from "../config/database.connection.js";

export async function trendingHashtags(req, res) {
    try {
        const { rows: result } = await filterHashtags();

        const returnData = result.map((el) => el.hashtags[0]);

        res.status(200).send(returnData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function listHashtags(req, res) {
    const { hashtag } = req.params;

    if (!isNaN(hashtag)) return res.sendStatus(400);

    try {
        const posts = await findHashtags(hashtag);

        if (posts.rowCount === 0) return res.sendStatus(404);
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
        res.status(200).send(postsWithLikes);
    } catch (error) {
        res.status(500).send(error.message);
    }
}