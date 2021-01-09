const config = require('config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: config.dbHost,
    user: 'root',
    password: 'password',
    database: 'adnetwork'
});

function runQuery(query, parameters = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, function (error, results, fields) {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}

module.exports = { runQuery };