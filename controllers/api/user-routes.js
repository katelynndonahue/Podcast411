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
      // newUser.hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const userData = await User.create(newUser);
      if (!userData) {
        res.status(404).json({ message: "Please try again!" });
        return;
      }
      const playlist = await Playlist.create({
        title: userData.username,
        user_id: userData.id
      });

      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = userData.id;
        req.session.playlist_id = playlist.id;
      res.status(200).json(userData);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
// Login
router.post('/login', async (req, res) => {

  console.log(req.body);
  try {
      const dbUserData = await User.findOne({
				where: {
					email: req.body.email,
				},
				include: [
					{
						model: Playlist,
					},
				],
			});
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.hashedPassword);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      console.log(dbUserData);
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id;
        req.session.playlist_id = dbUserData.playlist.id;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
//   DELETE
  router.delete("/:id", async (req, res) => {
    // delete a user
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if(!userData){
        res.status(404).json({ message: "Please enter a valad Category!" });
        return;
      }
    return res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports= router

