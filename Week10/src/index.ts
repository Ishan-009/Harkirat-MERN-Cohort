import { string } from "joi";
const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://tjjlxkdy:FYc5RTJKhL4eHwh3eWByzEf8Z0Rbt_H3@satao.db.elephantsql.com/tjjlxkdy",
});

client.connect();

// async function createUserTable() {
//   const result = await client.query(`CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );`);

//   console.log(result);
// }
// createUserTable();
const username: string = "Ishan09";
const email: string = "ishanmoorjmalani009@gmail.com";
const password: string = "ishan123";

async function insertDataInUser(
  username: string,
  email: string,
  password: string
) {
  try {
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    const values = [username, email, password];
    const result = await client.query(insertQuery, values);
    console.log("Data inserted successfully:", result);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

insertDataInUser(username, email, password);
