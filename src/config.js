// const dotenv = require('dotenv')
// dotenv.config()

const mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'piotrek',
    password : 'piotrek123',
    database : 'mojaBaza'
});

// let connection = mysql.createConnection({
//     host     : process.env.HOST,
//     user     : process.env.USER,
//     password : process.env.PASSWORD,
//     database : process.env.DB
// });

try {
    connection.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}

module.exports = connection;