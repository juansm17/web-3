const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



const getUserByHandle = async handle => {
  const qs = `
    SELECT name, handle, id, password
    FROM users
    WHERE handle = $1
  `;

  const { rows } = await pool.query(qs, [handle]);
  return rows[0];
};



const createUser = async (name, handle, password) => {
  const qs = `
    INSERT INTO users
      (name, handle, password)
    VALUES
      ($1, $2, $3)
    RETURNING id
  `;

  const { rows } = await pool.query(qs, [name, handle, password]);
  return rows[0];
};



const getAllUsers = async () => {
  const qs = `
    SELECT id, name, handle
    FROM users
  `;

  const { rows } = await pool.query(qs)
  return rows;
};



const deleteUserById = async id => {
  const qs = `
    DELETE FROM users
    WHERE id = $1
    RETURNING handle
  `;

  const { rows } = await pool.query(qs, [id]);
  return rows[0];
}


module.exports = {
  getUserByHandle,
  createUser,
  getAllUsers,
  deleteUserById,
}