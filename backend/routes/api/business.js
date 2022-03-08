const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Business } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    let businesses = await Business.findAll();
    console.log('FOUND', businesses);

    return res.json({
        businesses
    });
});

module.exports = router;
