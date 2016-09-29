// Require orm.js
var orm = require('../config/orm.js');

// 
var giftObject = {
    createUser: function(tableInput, full_name, address, email, password, cb) {
        orm.insertOne(tableInput, full_name, address, email, password, function(result){
            cb(result);
        });
    },
    
};

module.exports = giftObject;