const Pool = require('pg').Pool
const pool = new Pool( {
    user: "postgres",
    password: 'qwert1234',
    host: 'localhost',
    port: 5432,
    database: 'web_shop'
})

module.exports = pool