import {
    filterHashtags,
    findHashtags,
  } from "../repositories/HashtagsRepository.js";
  
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
      const list = await findHashtags(hashtag);
  
      if (list.rowCount === 0) return res.sendStatus(404);
  
      res.status(200).send(list.rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }