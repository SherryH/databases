var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select * from messages;', function(err, results, fields) {
        if (err) { console.log (err); } else {
          //console.log('data:', data);
          //console.log('fields:', fields);
          callback(results);
        }
      });
    }, // a function which produces all the messages
    post: function (req, callback) {

      db.query('select userID from users where username=?', [req.username], function (err, results) {
        var userID = results[0].userID;
        db.query('select roomID from rooms where roomname=?', [req.roomname],
          function (err, results) {
            //object with roomID
            //{roomID: }
            console.log('roomID results[0]:', results[0]);
            if (results[0]) {
              var roomID = results[0].roomID;
            } else {
              var roomID = 1;
              db.query('select roomID from rooms order by roomID desc limit 1;', function(err, results) {
                if (err) {
                  console.log(err);
                } else {
                  //check the highest roomID returned form table
                  // if the rommID is true, increment by 1
                  // roomID =1
                  db.query('insert into rooms values (?, ?);', [req.roomname, roomID], function (err, results) {
                  });
                }
              });
            }
            db.query('select id from messages order by id desc limit 1', function(err, results) {
              if (results[0]) {
                var id = parseInt(results[0].id) + 1;
              } else {
                var id = 1;
              }
              db.query('insert into messages values (?,?,?,?)', [id, req.message, userID, roomID], function (err, results) {
                if (err) {
                  console.log(err);
                }
              });
            });
          });
      });
      //db.query('insert into messages values ("' + req.text +'"");
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('select * from users;', function(err, results) {
        if (err) {
          console.log(err);
        }else{
          callback(results);
        }
      });
    },
    post: function (req, callback) {
      db.query('select userID from users order by userID desc limit 1', function (err, results) {
        if (err) {
          var userID = 1;
          console.log('results:', results);
          console.log('err make userID1: ', userID );
        } else {
          if (results[0]) {
            var userID = parseInt(results[0].userID) + 1;
          } else {
            var userID = 1;
          }
          console.log('no err userID: ', userID );
        }
        db.query('insert into users values (?, ?);', [req.username, userID], function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log('no err insert user: ', req.username,' ',userID );
            callback(results);
          }
        });
      });
    }
  }
};

