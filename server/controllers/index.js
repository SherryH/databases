
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({include: [db.User]})
      .then(function(messages) {
        res.json(messages);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //need to change req.body.username to userID
      db.User.findOrCreate({where: {username: req.body.username}})
      .spread(function(user, created) {
        db.Message.create({where: {
          userid: user.id,
          text: req.body.message,
          roomname: req.body.roomname
        }}).then(function(message) {
          res.sendStatus(201);
        });

      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      db.User.findAll()
      .then(function(users) {
        //express way to json stringify and send back
        res.json(users);
      });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
      .spread(function(user, created) {
        //if created then 201
        res.sendStatus(created? 201: 200);
      });
    }
  }
};

