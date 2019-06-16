const { Pool } = require('pg')
const config = require("./config.json")

const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    port: config.db.port
})

module.exports.pool = pool
