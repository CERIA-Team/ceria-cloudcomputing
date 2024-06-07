const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');

// Welcome route
router.get("/", (req, res) => {
    res.status(200).json({
        "message": "success"
    })
});

// Auth
router.post('/auth', userController.getUserData);

module.exports = router