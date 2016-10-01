// Require connection
var connection = require('../config/connection.js');

//Turns the object containing the columns that need to be updated into an array that the orm can use
function objToSql(ob){
  //column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + '=' + ob[key]);
  }

  return arr.toString();
}




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

    createGroup: function(tableInput, group_name, dollar_amount, cb){
    	var queryString = 'INSERT INTO ' + tableInput + ' (group_name, admin_user_id, dollar_amount) ';
        queryString += 'VALUES ("' + group_name + '", ' + dollar_amount + ');';

      	console.log(queryString);

       	connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    verifyUser: function(tableInput, email, password, cb){
    	var queryString = 'SELECT count(*) AS usersFound FROM ' + tableInput + ' WHERE email = (?) and password = (?)';

      	console.log(queryString);

       	connection.query(queryString, [email, password], function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    update: function(tableInput, objColVals, condition, cb){
        var queryString = 'UPDATE ' + tableInput;

        queryString += 'SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    logOn: function(email, cb){
        var queryString = "select users_groups.id, users_groups.groups_id, users_groups.groups_email users_groups.role, groups.group_name,  groups.dollar_amount FROM users_groups JOIN groups ON users_groups.groups_id = groups.id WHERE users_groups.users_email = (?)"

        console.log(queryString);

        connection.query(queryString, [email], function(err, result) {
            if (err) throw err;
            cb(result);
        });

    }





};

module.exports = orm;