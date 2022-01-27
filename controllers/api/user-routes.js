const router = require("express").Router();
const bcrypt = require('bcrypt');
const {User,Playlist} = require('../../models')
const saltRounds = 10;

// Read All
router.get("/", async (req, res) => {
    // find all users
    try {
      const userData = await User.findAll({
        include: [{ model: Playlist }],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // READ
router.get("/:id", async (req, res) => {
    // find user by its id
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: Playlist }],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// CREATE
router.post("/", async (req, res) => {
    // create a new user
    try {
      const newUser = req.body
      newUser.hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const userData = await User.create(newUser);
      if (!userData) {
        res.status(404).json({ message: "Please try again!" });
        return;
      }
      req.session.save(() => {
        req.session.loggedIn = true;
      res.status(200).json(userData);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports= router