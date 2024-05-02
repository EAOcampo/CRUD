const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  password: "root",
  database: "nodepg",
  port: "5432",
});

module.exports = pool;
