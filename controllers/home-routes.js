const router = require('express').Router();
// const fetchCuratedPodcastsLists  = require('podcast-api');
const client = require('../config/ListenNotes');
const { User, Podcast, Playlist } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    // console.log(req.method);
    // console.log('Hello World');
    client.fetchCuratedPodcastsLists({
    page: 1,
  }).then((response) => {
    // Get response json data here
    const podcastData = response.data.curated_lists
  //  console.log(podcastData);
  
    // console.log(podcasts);
  // res.json(podcasts)
    res.render('homepage',{
      podcastData,
      loggedIn: req.session.loggedIn
    })
    // return podcasts
}).catch((error) => {
    console.log(error)
  });

})
router.get("/profile", async (req, res)=>{
  try{
  const profileData = await User.findByPk(req.session.user_id, {
    include: [{
      model: Playlist,
    }]
  })
  console.log(profileData);
  const profile = profileData.get({plain:true});
  console.log(profile);
  res.render("profile",{
    profile,
    loggedIn: true,
    user_id: req.session.user_id
  });
  }catch(err){
    res.status(500).json(err);
  }
})
router.get("/search", async (req,res)=>{
  res.render("search");
})
// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router