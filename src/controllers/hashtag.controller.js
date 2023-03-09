import db from "../config/database.connection.js";

export async function hashtag(req, res) {
    const { hashtag } = req.params

    try {
        const hashtagExist = await db.query(
            `
                SELECT * FROM hashtag WHERE name = $1
            `, [hashtag]
        )
        if (hashtagExist.rowCount === 0) return res.sendStatus(404)
        await db.query(
            `
                SELECT * FROM "hashtagPost" WHERE "hashtagId" = $1
            `, [hashtagExist.rows[0].id]
        )
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}