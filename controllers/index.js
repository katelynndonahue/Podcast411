const router = require('express').Router();
const homeRoutes = require('./home-routes')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')

router.use('/',homeRoutes)
router.use('/api', apiRoutes);
router.use('/', homeRoutes)



module.exports = router;