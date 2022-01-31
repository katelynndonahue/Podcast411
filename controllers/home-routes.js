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
   console.log(podcastData);
    
    const podcasts = podcastData.map((pod)=>pod)
    console.log(podcasts);
    // res.json(podcasts)
    res.render('homepage',{
      podcasts,
      
    }) 
    // return podcasts
}).catch((error) => {
    console.log(error)
  });

})


module.exports = router