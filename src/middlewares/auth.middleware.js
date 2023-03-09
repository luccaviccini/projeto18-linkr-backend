import { db } from "../config/database.connection.js";

export default async function auth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.includes("Bearer ")) {
    return res.status(401).send();
  }
  const token = auth.replace("Bearer ", "");

  try {
    const session = (
      await db.query(
        `
        SELECT * FROM session WHERE token=$1
      `,
        [token]
      )
    ).rows[0];

    if (!session) {
      return res.status(401).send("Invalid token");
    }

    res.locals.session = session;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
