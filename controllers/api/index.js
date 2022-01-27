const router = require('express').Router();
const podcastRoutes = require('./podcast-routes')
const userRoutes = require('./user-routes')
const playlistRoutes = require('./playlist-routes')

router.use('/user',userRoutes)
router.use('/podcasts',podcastRoutes)
router.use('/playlist',playlistRoutes)


module.exports = router;
