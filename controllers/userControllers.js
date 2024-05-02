const pool = require("../db");

const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.json(rows);
  // res.send('Obteniendo usuario')
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(rows[0]);
};

const crearUsuario = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *",
      [data.name, data.email]
    );
    return res.json(rows[0]);
  } catch (error) {
    if(error.code === "23505"){
      return res.status(409).json({message: "Email already exist"})
    }

    return res.status(500).json({message: 'Internal server error'})
  }
};

const borrarUsuario = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM users WHERE id = ${id} RETURNING *`
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res.sendStatus(204);
};

const modificarUsuario = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // console.log(data.name, data.email);

  // const result = await pool.query(`UPDATE users SET name = ${data.name}, email = ${data.email} WHERE id = ${id}`)
  const { rows } = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [data.name, data.email, id]
  );

  // console.log(row);
  console.log(rows[0]);
  // res.send(`Actualizando usuario ${id}`)
  return res.json(rows[0]);
};

module.exports = {
  getUsers,
  getUser,
  crearUsuario,
  borrarUsuario,
  modificarUsuario,
};
