const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");

// Profile model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

// @route       GET api/pots/test
// @description Tests post route
// @access      Public
router.get("/profile/:handle/test", (req, res) =>
  res.json({ msg: "Posts works." })
);

// @route       GET api/posts
// @description Get post
// @access      Public
router.get("/profile/:handle/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (posts.handle !== req.body.handle) {
        errors.noposts = "There is no posts for this user";
        res.status(404).json(errors);
      }
      res.json(posts);
    })
    .catch(err => res.status({ nopostsfound: "No posts found with that ID" }));
});

// @route       GET api/posts/:id
// @description Get post
// @access      Public
router.get("/profile/:handle/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route       POST api/posts
// @description Create post
// @access      Private
router.post(
  "profile/:handle/posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      picture: req.body.picture,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route       DELETE api/posts/:id
// @description Delete post
// @access      Private
router.delete(
  "/profile/:handle/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route       POST api/posts/like/:id OR /profile/:handle/like/:id
// @description Like post
// @access      Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          post.likes.unshift(
            { user: req.user.id },
            { ratingNumber: req.body.ratingNumber }
          );

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route       POST api/posts/unlike/:id
// @description Unlike post
// @access      Private
router.post(
  "/profile/:handle/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have not like this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route       POST api/posts/comment/:id OR /profile/:handle
// @description Add comment to post
// @access      Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    console.log("blblal");
    // Check validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log(req.params.id);
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          picture: req.body.picture,
          user: req.user.id,
          handle: req.body.handle
        };

        // add to comments array
        console.log(newComment);
        post.comments.unshift(newComment);

        // save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

// @route       DELETE api/posts/comment/:id/;:comment_id
// @description Remove comm from post
// @access      Private
router.delete(
  "/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.params", req.params);
    Post.findById(req.params.comment_id)
      .then(post => {
        console.log("post.length", post._id);
        // Check to see if comment exists

        let stuff = post.comments.filter(comment => {
          return comment._id.toString() === req.params.comment_id;
        });
        console.log(stuff.toString().length);

        if ((post._id === req.params.comment_id).length === 0) {
          // if (
          //   post.comments.filter(
          //     comment => comment._id.toString() === req.params.comment_id
          //   ).length === 0
          // )
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

module.exports = router;
