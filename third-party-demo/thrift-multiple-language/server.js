var thrift = require('thrift');

var UserStorage = require('./gen-nodejs/UserStorage.js'),
    ttypes = require('./gen-nodejs/user_types');

var users = {};

var server = thrift.createServer(UserStorage, {
  store: function(user, success) {
    console.log("server stored:", user);
    users[user.uid] = user;
    success();
  },

  retrieve: function(uid, success) {
    console.log("server retrieved:", uid);
    success(users[uid]);
  },
});

server.listen(9090);

