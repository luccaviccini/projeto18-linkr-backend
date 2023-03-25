import {db} from "../config/database.connection.js";

export async function filterHashtags() {
  return await db.query(`
    SELECT REGEXP_MATCHES(p.description, '#([A-Za-z0-9]+)', 'g') AS hashtags, count(p) AS num
    FROM posts p
    GROUP BY hashtags
    ORDER BY num DESC
    LIMIT 10
    `);
}

export async function findHashtags(hashtag) {
  return await db.query(
    `
        SELECT "posts"."id", "description", COALESCE("posts"."createdAt") AS "post_date", "username", "pictureUrl" AS "user_image", "url" AS "post_url" 
        FROM "posts" 
        LEFT JOIN "users" 
        ON "users"."id" = "posts"."id_user"
        WHERE "post" LIKE '%#${hashtag}%'`
  );
}