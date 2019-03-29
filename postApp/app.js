var mongoose = require("mongoose");
var userschema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  gender: {
    type: String
  }
});
var postschema = mongoose.Schema({
  token: {
    type: String
  },
  head: {
    type: String
  },
  body: {
    type: String
  },
  likes:{
    type:Number
  }
});
var commentschema = mongoose.Schema({
  token: {
    type: String
  },
  postid:{
    type:String
  },
  comment: {
    type: String
  }
});
var likeschema=mongoose.Schema({
  utoken: {
    type: String
  },
  postid:{
    type:String
  }
});

var users = mongoose.model("users", userschema);
var likes = mongoose.model("likes", likeschema);
var posts = mongoose.model("posts", postschema);
var comments = mongoose.model("comments", commentschema);
module.exports = { users, posts, comments,likes};
