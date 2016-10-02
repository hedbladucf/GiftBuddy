// Require orm.js
var orm = require('../config/orm.js');
 
// 
var giftObject = {
    createUser: function(tableInput, full_name, address, email, password, cb) {
        orm.insertOne(tableInput, full_name, address, email, password, function(result){
            cb(result);
        });
    },

    createGroup: function(tableInput, group_name, dollar_amount, cb){
    	orm.createGroup(tableInput, group_name, dollar_amount, function(result){
    		cb(result);
    	})
    },

    verifyUser: function(tableInput, email, password, cb){
    	orm.verifyUser(tableInput, email, password, function(result){
    		cb(result);
    	})
    },

    update: function(tableInput, objColVals, condition, cb){
        orm.update(tableInput, objColVals, condition, function(res){
            cb(res);
        });
    },

    logOn: function(email, cb){
        orm.logOn(email, function(res){
            cb(res);
        })
    },

    allInGroup: function(groupsID, cb){
        orm.allInGroup(groupsID, function(res){
            cb(res);
        })
    }
    
};

module.exports = giftObject;