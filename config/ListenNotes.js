const { Client } = require('podcast-api');
require('dotenv').config();
const client = Client({ apiKey: process.env.API_KEY });
client.fetchCuratedPodcastsLists({
    page:1
})

module.exports = client