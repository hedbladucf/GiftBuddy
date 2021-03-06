// Require connection
var connection = require('../config/connection.js');

//Turns the object containing the columns that need to be updated into an array that the orm can use
function objToSql(ob){
  //column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + '= "' + ob[key] + '"');
  }

  return arr.toString();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* OBJECT RELATIONAL MODEL */
var orm = {
    createUser: function(tableInput, full_name, email, password, cb) {
        var queryString = 'INSERT INTO ' + tableInput + ' (full_name, email, password) ';
        queryString += 'VALUES ("' + full_name + '", "' + email + '", "' + password + '");';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    createGroup: function(tableInput, group_name, dollar_amount, cb){
    	var queryString = 'INSERT INTO ' + tableInput + ' (group_name, dollar_amount) ';
        queryString += 'VALUES ("' + group_name + '", ' + dollar_amount + ');';

      	console.log(queryString);

       	connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },


    addUsersToGroup: function(tableInput, members, group_id, cb){

        var queryString = 'INSERT INTO ' + tableInput + ' (users_id, groups_id, admin, assigned_user_id)';
        queryString += ' VALUES ';
        var senders = shuffle(members);
        var receivers = senders.slice();
        var pairs = [];

        receivers.unshift(receivers.pop());
        for(var j = 0; j < senders.length; j++)
        {
            pairs.push({ "sender": senders[j], "receiver": receivers[j]});
        }
        for (var i=0; i<pairs.length; i++){
            queryString += '(' + pairs[i].sender + ', ' + group_id;
            if(i == 0)
                queryString += ', 1, ';
            else
                queryString += ', 0, ';
            queryString += pairs[i].receiver + ')';
            if(i != (members.length - 1))
                queryString += ',';
        }

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    findGroup: function(tableInput, group_name, cb){
        var queryString = 'SELECT groups.g_id FROM ' + tableInput + ' WHERE groups.group_name = "' + group_name + '";';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });

    },

    findUserID: function(tableInput, email, cb){
        var queryString = 'SELECT users.u_id, users.full_name FROM users WHERE users.email = "' + email + '";';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    findUserName: function(tableInput, userID, cb){
        var queryString = 'SELECT users.full_name FROM users WHERE users.u_id = "' + userID + '";';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    verifyCredentials: function(tableInput, email, password, cb){
    	var queryString = 'SELECT count(*) AS usersFound FROM ' + tableInput + ' WHERE email = (?) and password = (?);';

      	console.log(queryString);

       	connection.query(queryString, [email, password], function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    verifyUserID: function(tableInput, userID, cb){
        var queryString = 'SELECT users.email, users.password FROM ' + tableInput + ' WHERE users.u_id = ' + userID + ';';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });

    },


    updateAccount: function(tableInput, objColVals, userID, cb){
        var queryString = 'UPDATE ' + tableInput;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE users.u_id = ' + userID;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    logOn: function(userID, cb){
        var queryString = "SELECT groups.g_id, users.u_id, groups.group_name, users_groups.admin, groups.dollar_amount, groups.active FROM users_groups JOIN groups ON users_groups.groups_id = groups.g_id JOIN users ON users_groups.users_id = users.u_id WHERE users.u_id = (?)";

        console.log(queryString);

        connection.query(queryString, [userID], function(err, result) {
            if (err) throw err;
            cb(result);
        });

    },

    //Find all users in a group
    allInGroup: function(groupsID, cb){
        var queryString = "SELECT groups.g_id, groups.group_name, users.u_id, users.full_name, users.email, users_groups.admin FROM users_groups JOIN groups ON users_groups.groups_id = groups.g_id JOIN users ON users_groups.users_id = users.u_id WHERE groups.g_id = (?)";

        console.log(queryString);

        connection.query(queryString, [groupsID], function(err, result) {
            if (err) throw err;
            cb(result);
        });  
    },

    //Find a user in a group
    userInGroup: function(userID, groupID, cb){
        var queryString = "SELECT * FROM users_groups WHERE users_groups.users_id = (?) and users_groups.groups_id = (?);";

        console.log(queryString);

        connection.query(queryString, [userID,groupID], function(err, result) {
            if (err) throw err;
            cb(result);
        });  
    },
    userAccountInfo: function(userID, cb){
        var queryString = 'SELECT * FROM users WHERE users.u_id = ' + userID + ';';

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });  
    },


    allBesidesUser: function(userID, cb){
        var queryString = 'select users.u_id, users.full_name from users where users.u_id != ' + userID;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        }); 
    },

    yourBuddyInfo: function(userID, groupID, cb){
        var queryString = 'select users.u_id, users_groups.item_note, users.full_name, users.address, users.email, users.wishes FROM users JOIN users_groups ON users_groups.assigned_user_id = users.u_id where users_groups.users_id = (?) AND users_groups.groups_id = (?)';
        console.log(queryString);

        connection.query(queryString, [userID, groupID], function(err, result) {
            if (err) throw err;
            cb(result);
        }); 

    },

    sendGift: function(groupsID, buddyID, itemNote, cb){
        var queryString = 'UPDATE users_groups SET item_note = (?) WHERE users_id = (?) and groups_id = (?)';
        console.log(queryString);

        connection.query(queryString, [itemNote, buddyID, groupsID], function(err, result) {
            if (err) throw err;
            cb(result);
        }); 
    }

 



};

module.exports = orm;