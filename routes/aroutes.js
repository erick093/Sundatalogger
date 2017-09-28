var express = require('express');
var router = express.Router();
var User = require('../models/user');
// GET route for reading data
router.get('/register', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/public/register.html'));
});

//POST route for updating data
router.post('/register', function (req, res, next) {

  if (req.body.email &&
    req.body.username &&
    req.body.password ) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/control');
      }
    });
  }
});

router.post('/login', function (req, res, next) {
  if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/control');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  });

  router.get('/control', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.sendFile(path.join(__dirname + '/public/control.html'));
        }
      }
    });
});

module.exports = router;
