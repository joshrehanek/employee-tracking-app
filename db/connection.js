'use strict';
const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    // Your username
    user: 'root',
    // Your password
    password: 'Anime100587',
    database: 'employee_trackerDB'
});
connection.connect();
// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);
module.exports = connection;