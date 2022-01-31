const router = require('express').Router();
// const fetchCuratedPodcastsLists  = require('podcast-api');
const client = require('../config/ListenNotes')

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