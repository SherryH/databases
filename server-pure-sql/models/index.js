var db = require('../db');
//---------------- Testing ----
var Promise = require('bluebird');
var dbAsync = Promise.promisifyAll(db);

//--------------------

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select * from messages;', function(err, data, fields) {
        if (err) { console.log (err); } else {
          console.log('data:', data);
          console.log('fields:', fields);
          callback(data);
        }
      });
    }, // a function which produces all the messages
    post: function (req, callback) {
      console.log(req);
      console.log('req.username', req.username);

      //------------ Testing -------------------
      var userID, roomID, id;
      var q1 = dbAsync.queryAsync('select id from messages order by id desc limit 1;')
      .then((results)=> {
        return id = parseInt(results[0].id) +1;
        console.log('id:', id);
      })
      .catch((error)=> { console.log(error); });
      var q2 = dbAsync.queryAsync('select userID from users where username=?;', [req.username])
      .then((results)=> {
        return userID = results[0].userID;
        console.log('userID:', userID);
      })
      .catch((error)=> { console.log(error); });
      var q3 = dbAsync.queryAsync('select roomID from rooms where roomname=?;', [req.roomname])
      .then((results)=> {
        return roomID = results[0].roomID;
        console.log('roomID:', roomID);
      })
      .catch((error)=> { console.log(error); });
      Promise.all([q1, q2, q3])
      .then(([results1, results2, results3]) => {
        db.query('insert into messages values (?,?,"promise2",?)', [results1, results2, results3], function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log('id, userID, roomID', results1, results2, results3);
          }
        });
      });
      //----------------------------------------
      // db.query('select userID from users where username=?', [req.username], function (err, results) {
      //   var userID = results;
      // });
      // db.query('select roomID from rooms where roomname=?', [req.roomname],
      // function (err, results) {
      //   var roomID = results;
      // });
      // db.query('select id from messages order by id desc limit 1', function(err, results) {
      //   var id = results;
      // });
      // db.query('insert into messages values (?,text,?,?)', [id, userID, roomID], function (err, results) {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      callback(201);
      //db.query('insert into messages values ("' + req.text +'"");
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};