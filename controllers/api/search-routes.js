const router = require('express').Router();
// const client = require('../../config/ListenNotes')
const {Client} =require('podcast-api');
const withAuth = require('../../utils/auth');
const client = Client({apiKey: process.env.API_KEY});
// let searchEl = document.querySelector(".search");
// searchEl.value.trim();
router.get('/', async (req,res) =>{
    client
			.search({
				q: "hello",
				episode_count_max: 25,
				safe_mode: 1,
			})
			.then((response) => {
				const podcastData = response.data.results;
				console.log(podcastData);
                podcasts = podcastData.map((pod)=>pod)
                res.render('search',
                podcasts)
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