var mysql = require('mysql');
var Sequelize = require('sequelize');

//set up DB
var orm = new Sequelize('chat', 'root', '');

//define table users and messages
//sequelize automatically appends the 's' at end
var User = orm.define('user', {
  username: {type: Sequelize.STRING}
});

var Message = orm.define('message', {
  roomname: {type: Sequelize.STRING},
  text: {type: Sequelize.STRING}
});

//establish associations between tables
User.hasMany(Message);
Message.belongsTo(User);

//Sync the model to DB
User.sync();
Message.sync();


exports.User = User;
exports.Message = Message;

