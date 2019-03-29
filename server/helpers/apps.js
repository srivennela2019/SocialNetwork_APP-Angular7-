var db = require("../models");
var valid = require("../models/validation");
var jwt = require("jsonwebtoken");
var winston = require("winston");
//winston.add(winston.transports.File, { filename: "./log/logfile.log" });
exports.getUsers = function(req, res) {
  db.users.find().then(function(users) {
    winston.log(users);
    res.json(users);
  });
};
exports.getPosts = function(req, res) {
  db.posts.find().then(function(postsi) {
   res.json(postsi);
  });
};
exports.getComments = function(req, res) {
  db.comments.find().then(function(comments) {
    res.json(comments);
  });
};
exports.postComments = function(req, res) {
  db.comments.create(req.body).then(function(newComment) {
    res.status(201).json(newComment);
  });
};
exports.deleteComments = function(req, res) {
  db.comments.deleteMany({ postid: req.params.pid }).then(function() {
    res.json({ message: "comments deleted" });
  });
};
exports.authenticate = function(req, res) {
  db.users
    .find({
      $and: [{ username: req.body.username }, { password: req.body.password }]
    })
    .then(function(data) {
      if (data.length == 0) {
        res.send({
          islogin: false,
          err: "invalid details"
        });
      } else {
        var jtoken = jwt.sign(
          {
            datauser: data,
            org: "marlabs"
          },
          "vennela-secret",
          { expiresIn: "1h" }
        );
        res.send({
          islogin: true,
          token: jtoken
        });
      }
    });
};
exports.createUsers = function(req, res) {
  if (valid.validUser(req.body)) {
    res.status(403).send("Error");
  } else {
    db.users.create(req.body).then(function(newUser) {
      res.status(201).json(newUser);
    });
  }

  // res.send(req.body);
};
exports.createPost = function(req, res) {
  if (valid.validPost(req.body)) {
    res.status(403).send("Error");
  } else {
    db.posts.create(req.body).then(function(newPost) {
      res.status(201).json(newPost);
    });
  }

  // res.send(req.body);
};
exports.getLikes = function(req, res) {
  db.likes.find().then(function(likes) {
    res.json(likes);
    winston.log(likes);
  });
};
exports.postLikes = function(req, res) {
  db.likes.create(req.body).then(function(newLike) {
    res.status(201).json(newLike);
  });
};
// exports.checkLike = function(req, res) {
//   db.likes
//     .find({ $and: [{utoken: req.body.utoken}, {postid: req.params.pid} ] })
//     .then(function(newLike) {
//       if (newLike.length == 0) {
//         res.send({
//           check: false
//         });
//       } else {
//         res.send({
//           check: true
//         });
//       }
//     });
// };
exports.deleteLikes = function(req, res) {
  db.comments.deleteMany({ postid: req.params.pid }).then(function() {
    res.json({ message: "likes deleted" });
  });
};
exports.getPost = function(req, res) {
  db.posts.findById(req.params.postId).then(function(foundPost) {
    res.json(foundPost);
  });
};
exports.updatePost = function(req, res) {
  //res.send("update route");
  db.posts
    .findOneAndUpdate({ _id: req.params.postId }, req.body)
    .then(function(uPost) {
      res.json(uPost);
    });
};
exports.deletePost = function(req, res) {
  //res.send("update route");
  db.posts.remove({ _id: req.params.postId }).then(function() {
    res.json({ message: "deleted" });
  });
};
module.exports = exports;
