import mysql from "mysql";

const db = mysql.createConnection({
    host:"localhost",
    user : "root",
    password : "admin101992",
    database : "soical",
});



export default db;