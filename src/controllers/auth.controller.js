import bcrypt from "bcrypt"
import db from "../config/database.connection.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {

const {email, password, username, pictureUrl } = req.body

try {
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email])

    if (existingUser.rowCount !== 0) return res.sendStatus(409)

    const hashedPassword = bcrypt.hashSync(password, 10)

    await db.query(
        'INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)',
     [email, hashedPassword, username , pictureUrl])

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }

}
