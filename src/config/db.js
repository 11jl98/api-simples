const mysql = require('mysql');

function connect() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bancoteste'
    });
    
    return connection;
}

module.exports = connect();