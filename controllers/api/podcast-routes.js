
const router = require('express').Router();
const { Podcast } = require('../../models');
const withAuth = require('../../utils/auth');




router.post('/', withAuth, async (req, res) => {
  try {
    const newPodcast = await Podcast.create({
      ...req.body,
      playlist_id: req.session.user_id,
    });

    res.status(200).json(newPodcast);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
	try {
		const podcastData = await Podcast.findAll();
		res.status(200).json(podcastData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id',withAuth, async(req, res)=>{
    try{
        const podcastData = await Podcast.findByPK(req.params.id)
        const podcast = podcastData.get({plain: true});
        res.render('singlePodcast', {
            ...podcast,
            loggedIn: req.session.loggedIn
        });
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const podcastData = await Podcast.destroy({
      where: {
        id: req.params.id,
        playlist_id: req.session.playlist_id,
      },
    });

    if (!podcastData) {
      res.status(404).json({ message: 'No podcast found with this id!' });
      return;
    }

    res.status(200).json(podcastData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
