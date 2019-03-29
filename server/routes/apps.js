var express = require("express");
var app = express();
var router = express.Router();
var jwt = require("jsonwebtoken");
var db = require("../models");
var helpers = require("../helpers/apps");
router
  .route("/")
  .get(helpers.getUsers)
  .post(helpers.createUsers);
router.route("/authenticate").post(helpers.authenticate);
app.use((req, res, next) => {
  var token =
    req.headers.authtoken || req.body.authtoken || req.params.authtoken;
  jwt.verify(token, "vennela-secret", (err, decoded) => {
    if (err) {
      res.status(400).send({
        err: "invalid details",
        islogin: false
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});
router
  .route("/posts")
  .get(helpers.getPosts)
  .post(helpers.createPost);
router
  .route("/posts/:postId")
  .get(helpers.getPost)
  .delete(helpers.deletePost)
  .put(helpers.updatePost);
router
  .route("/comments")
  .get(helpers.getComments)
  .post(helpers.postComments);
router.route("/comments/:pid").delete(helpers.deleteComments);
router
  .route("/likes")
  .get(helpers.getLikes)
  .post(helpers.postLikes);
router.route("/likes/:pid")
// .post(helpers.checkLike)
.delete(helpers.deleteLikes);
module.exports = router;
 