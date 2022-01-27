const router = require("express").Router();
const {User,Podcast,Playlist}= require('../../models')


// getAll
router.get('/', async (req,res)=>{
    try {
        const playlistData = await Playlist.findAll({
            include:[{model:User},{model:Podcast}]
        })
        res.status(200).json(playlistData)
    } catch (err) {
      res.status(500).json(err);
    }
})

// READ
router.get("/:id", async (req, res) => {
    // find user by its id
    try {
      const playlistData = await Playlist.findByPk(req.params.id, {
        include: [{model:User},{model:Podcast}],
      });
      res.status(200).json(playlistData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// CREATE
router.post("/", async (req, res) => {
    // create a new user
    try {
      const playlistData = await Playlist.create(req.body);
      if (!playlistData) {
        res.status(404).json({ message: "Please try again!" });
        return;
      }
      res.status(200).json(playlistData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 //   UPDATE
 router.put("/:id", async (req, res) => {
    // update a category by its `id` value
    try {
      const playlistData = await Playlist.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if(!playlistData){
        res.status(404).json({ message: "Please try again!" });
        return;
      }
    return res.status(200).json(playlistData);
    } catch (err) {
      res.status(500).json(err);
    }
    
  });
  router.delete("/:id", async (req, res) => {
    // delete a blog
    try {
      const playlistData = await Playlist.destroy({
        where: {
          id: req.params.id,
        },
      });
      if(!playlistData){
        res.status(404).json({ message: "Please enter a valad Playlist!" });
        return;
      }
    return res.status(200).json(playlistData);
    } catch (err) {
      res.status(500).json(err);
    }
});







module.exports=router

