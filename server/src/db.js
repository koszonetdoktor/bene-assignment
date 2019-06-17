const { Pool } = require('pg')
const config = require("./config.json")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports.pool = pool

// const pool = new Pool({
//     user: config.db.user,
//     host: process.env.DATABASE_URL,
//     database: config.db.database,
//     port: config.db.port
// })