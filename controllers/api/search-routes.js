const router = require('require').Router();
// const client = require('../../config/ListenNotes')
const {Client} =require('podcast-api');
const client = Client({apiKey: process.env.API_KEY});
client.search({
    
})