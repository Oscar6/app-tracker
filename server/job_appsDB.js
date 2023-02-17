const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "p@55w0rd",
    host: "localhost",
    port: 5432,
    database: "job_apps"
});

module.exports = pool;