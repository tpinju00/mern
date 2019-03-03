const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const validatePostInput = require("../../validation/post");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route       GET api/profile/test
// @description Tests profile route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Profile works." }));

// @route       GET api/profile/
// @description Get current users profile
// @access      Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "picture"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       GET api/profile/all
// @description Get all profile
// @access      Public
router.get("/all", (req, res) => {
  const errors = {};
  console.log("query is giving me:", req.query);
  //console.log("res je:", res);

  Profile.find()
    .populate("user", ["name", "picture"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles for this user";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "There are no profiles for this user" })
    );
});

// @route       GET api/profile/all/status/:status
// @description Get status profiles
// @access      Public
router.get("/all/status/:status", (req, res) => {
  const errors = {};

  Profile.find({ status: req.params.status })
    .populate("user", ["name", "picture"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles for this user";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "There are no profiles for this user" })
    );
});

// @route       GET api/profile/level/:level
// @description Get profile by level
// @access      Public
router.get("/level/:level", (req, res) => {
  const errors = {};

  Profile.findOne({ level: req.params.level })
    .populate("user", ["name", "picture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is not profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/handle/:handle
// @description Get profile by handle
// @access      Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "picture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is not profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/user/:user_id
// @description Get profile by user ID
// @access      Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "picture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is not profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route       POST api/profile/
// @description Create or edit user profile
// @access      Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.level) profileFields.level = req.body.level;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //Skills - SPlit into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check to see if the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route       POST api/posts/rating/:id
// @description Add rating
// @access      Private
router.post(
  "/rating/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findById(req.params.id)
        .then(profile => {
          if (
            profile.ratings.filter(
              rating => rating.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyrated: "User already rated this profile" });
          }

          profile.ratings.unshift(
            { user: req.user.id },
            { ratingNumber: req.body.ratingNumber }
          );

          profile.save().then(profile => res.json(profile));
        })
        .catch(err =>
          res.status(404).json({ profilenotfound: "No profile found" })
        );
    });
  }
);

// @route       POST api/profile/experience
// @description Add experience to profile
// @access      Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route       POST api/profile/education
// @description Add education to profile
// @access      Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to Edu array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route       POST api/profile/:handle/posts
// @description Create post
// @access      Private
router.post(
  "/:handle/posts",
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
      user: req.user.id,
      handle: req.body.handle
    });
    console.log("postjeNAPRAVLJEN");

    newPost.save().then(post => res.json(post));
  }
);

// @route       POST api/posts/like/:id
// @description Like post
// @access      Private
router.post(
  "/:handle/like/:id",
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
          console.log("params", req.params);
          console.log("body", req.body);
          //console.log(req.body.ratingNumber);
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

// @route       GET api/posts
// @description Get post
// @access      Public
router.get("/:handle/posts/", (req, res) => {
  Post.find({ handle: req.params.handle })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status({ nopostsfound: "No posts found for that user" }));
});

// @route       DELETE api/profile/experience/:exp_id
// @description Delete experience from profile
// @access      Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       DELETE api/profile/education/:edu_id
// @description Delete education from profile
// @access      Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       DELETE api/profile
// @description Delete user and profile
// @access      Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ sucess: true })
      );
    });
  }
);

module.exports = router;
