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

    createGroup: function(tableInput, group_name, admin_user_id, dollar_amount, cb){
    	var queryString = 'INSERT INTO ' + tableInput + ' (group_name, admin_user_id, dollar_amount) ';
        queryString += 'VALUES ("' + group_name + '", ' + admin_user_id + '", ' + dollar_amount + ');';

      	console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    
};

module.exports = orm;