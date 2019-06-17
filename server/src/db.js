const { Pool } = require('pg')
const config = require("./config.json")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports.pool = pool.connect()
