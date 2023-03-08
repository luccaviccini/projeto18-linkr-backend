import { db } from '../config/database.connection.js';

export default async function auth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.includes('Bearer ')) {
    return res.status(401).send();
  }
  const token = auth.replace('Bearer ', '');
  const user = (await db.query(`
        SELECT * FROM session WHERE token=$1
      `, [token])).rows[0];

  if (!user) {
    return res.status(401).send();
  }

  res.locals.user = user;
  next();
}