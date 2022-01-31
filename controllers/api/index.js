const router = require('express').Router();
const podcastRoutes = require('./podcast-routes')
const userRoutes = require('./user-routes')
const playlistRoutes = require('./playlist-routes')
const searchRoutes = require('./search-routes')

router.use('/user',userRoutes)
router.use('/podcasts',podcastRoutes)
router.use('/playlist',playlistRoutes)
router.use('/search', searchRoutes)


module.exports = router;
