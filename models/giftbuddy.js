// Require orm.js
var orm = require('../config/orm.js');
  
// 
var giftObject = {
    createUser: function(tableInput, full_name, email, password, cb) {
        orm.createUser(tableInput, full_name, email, password, function(result){
            cb(result);
        });
    },

    createGroup: function(tableInput, group_name, dollar_amount, cb){
    	orm.createGroup(tableInput, group_name, dollar_amount, function(result){
    		cb(result);
    	});
    },

    addUserToGroup: function(tableInput, users_id, groups_id, admin, cb){
        orm.addUserToGroup(tableInput, users_id, groups_id, admin, function(result){
            cb(result);
        });
    },

    findGroup: function(tableInput, group_name, cb){
        orm.findGroup(tableInput, group_name, function(result){
            cb(result);
        });
    },

    verifyUser: function(tableInput, email, password, cb){
    	orm.verifyUser(tableInput, email, password, function(result){
    		cb(result);
    	});
    },

    update: function(tableInput, objColVals, condition, cb){
        orm.update(tableInput, objColVals, condition, function(res){
            cb(res);
        });
    },

    logOn: function(email, cb){
        orm.logOn(email, function(res){
            cb(res);
        });
    },

    allInGroup: function(groupsID, cb){
        orm.allInGroup(groupsID, function(res){
            cb(res);
        });
    }
    
};

module.exports = giftObject;