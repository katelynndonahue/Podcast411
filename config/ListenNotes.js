const { Client } = require('podcast-api');
const client = Client({ apiKey: process.env.API_KEY });

module.exports = client