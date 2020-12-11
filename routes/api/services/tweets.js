const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



const getAllTweets = async () => {
  const qs = `
    SELECT T.*, U.name, U.handle
    FROM tweets AS T, users AS U
    WHERE T.user_id = U.id
    ORDER BY T.idpos DESC
  `;

  const { rows } = await pool.query(qs);
  return rows;
}



const getTweetById = async id => {
  const qs = `
    SELECT T.*, U.name, U.handle
    FROM tweets AS T, users AS U
    WHERE T.idpos = $1
  `;

  const { rows } = await pool.query(qs, [id]);
  return rows[0];
};



const postTweet = async (message, userId) => {
  const qs = `
    INSERT INTO tweets
      (message, user_id)
    VALUES
      ($1, $2)
    RETURNING *
  `;

  const { rows } = await pool.query(qs, [message, userId]);
  return rows[0];
};


module.exports = {
  getAllTweets,
  getTweetById,
  postTweet,
};