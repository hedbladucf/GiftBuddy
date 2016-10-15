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

    addUsersToGroup: function(tableInput, members, group_id, cb){
        orm.addUsersToGroup(tableInput, members, group_id, function(result){
            cb(result);
        });
    },

    findGroup: function(tableInput, group_name, cb){
        orm.findGroup(tableInput, group_name, function(result){
            cb(result);
        });
    },

    findUserID: function(tableInput, email, cb){
        orm.findUserID(tableInput, email, function(result){
            cb(result)
        });
    },

    findUserName: function(tableInput, userID, cb){
        orm.findUserName(tableInput, userID, function(result){
            cb(result);
        });
    },


    verifyCredentials: function(tableInput, email, password, cb){
    	orm.verifyCredentials(tableInput, email, password, function(result){
    		cb(result);
    	});
    },

    verifyUserID: function(tableInput, userID, cb){
        orm.verifyUserID(tableInput, userID, cb, function(result){
            cb(result);
        });
    },

    updateAccount: function(tableInput, objColVals, userID, cb){
        orm.updateAccount(tableInput, objColVals, userID, function(res){
            cb(res);
        });
    },

    logOn: function(userID, cb){
        orm.logOn(userID, function(res){
            cb(res);
        });
    },

    allInGroup: function(groupsID, cb){
        orm.allInGroup(groupsID, function(res){
            cb(res);
        });
    },
    userInGroup: function(userID, groupID, cb){
        orm.userInGroup(userID, groupID, function(res){
            cb(res);
        });
    },

    userAccountInfo: function(userID, cb){
        orm.userAccountInfo(userID, function(res){
            cb(res);
        });
    },

    allBesidesUser: function(userID, cb){
        orm.allBesidesUser(userID, function(res){
            cb(res);
        });
    },

    yourBuddyInfo: function(userID, groupID, cb){
        orm.yourBuddyInfo(userID, groupID, function(res){
            cb(res);
        });
    },

    sendGift: function(groupsID, buddyID, itemNote, cb){
        orm.sendGift(groupsID, buddyID, userID, itemNote, function(res){
            cb(res);
        });
    }
};

module.exports = giftObject;