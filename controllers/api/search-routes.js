const router = require('express').Router();
// const client = require('../../config/ListenNotes')
const {Client} =require('podcast-api');
const withAuth = require('../../utils/auth');
const client = Client({apiKey: process.env.API_KEY});
// let searchEl = document.querySelector(".search");
// searchEl.value.trim();
router.post('/', async (req,res) =>{
    console.log(req.body);
    // let searchEl = document.querySelector(".search");
	// searchEl.value.trim();
    client
			.search({
				q: req.body,
				episode_count_max: 25,
				safe_mode: 1,
			})
			.then((response) => {
				const podcastData = response.data.results;
				// console.log(podcastData);
               const podcasts = podcastData.map((pod)=>pod.podcast)
                console.log({podcasts});
                // res.redirect("/api/search");
                // res.render('search',
                // {podcasts})
                res.json(podcasts);
			}).catch((error)=>{
                console.log(error);
            })
})
// client.search({
//     q: "hello",
//     episode_count_max: 25,
//     safe_mode: 1   
// }).then((response)=>{
//     const podcastData = response.data.results;
//     console.log(podcastData);

// })

module.exports = router;