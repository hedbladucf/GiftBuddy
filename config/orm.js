// Require connection
var connection = require('../config/connection.js');

/* OBJECT RELATIONAL MODEL */
var orm = {
    createUser: function(tableInput, full_name, address, email, password, cb) {
        var queryString = 'INSERT INTO ' + tableInput + ' (full_name, address, email, password) ';
        queryString += 'VALUES ("' + full_name + '", ' + address + '", ' + email + '", ' + password + ');';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },	
};

module.exports = orm;