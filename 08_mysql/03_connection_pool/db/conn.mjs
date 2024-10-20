import mysql from "mysql";

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

export default pool;
