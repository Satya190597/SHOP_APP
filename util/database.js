const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'admin',
    database: 'NODE_SHOP',
    password: 'password'
});

module.exports = pool.promise();