const express = require("express");
const kemuningRoutes = require('./kemuning')
const payakumbuhRoutes = require('./payakumbuh')
const authRoutes = require('./auth');
const apiRoutes = require('./api');

const router = express.Router();


router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use('/auth', authRoutes)
router.use('/api', apiRoutes)
router.use('/payakumbuh', payakumbuhRoutes)
router.use('/kemuning', kemuningRoutes)


module.exports = router;
