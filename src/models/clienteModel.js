const mysql = require('../config/db')

function query(sql) {
    return new Promise((resolve, reject) => {
        console.log(sql)
        mysql.query(sql, function (error, results, fields) {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        });
    })
}

module.exports = { query }