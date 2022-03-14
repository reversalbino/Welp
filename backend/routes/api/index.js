const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./business.js');
const reviewRouter = require('./review.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/business', businessRouter);
router.use('/review', reviewRouter);

module.exports = router;
